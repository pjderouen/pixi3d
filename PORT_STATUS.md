# PixiJS v8 port status

Pixi3D (upstream: https://github.com/jnsmalm/pixi3d) has no PixiJS v8 support.
Its own issue tracker has an open v8 feature request since September 2024
and a closed duplicate from August 2024, neither acted on; the last commit
to the project was in May 2024. This fork exists to port it to v8 so it can
be used in a v8 project. Branch: `pixi-v8-port`.

The goal is a compatibility port, not a redesign: every feature Pixi3D 2.5.0
has, with the same public API wherever PixiJS v8 allows. Where v8 forces a
difference, it is the smallest possible one and is written down.

## PixiJS version

- **Target: PixiJS 8.20.** `peerDependencies` is `pixi.js ^8.20.0`; the port
  is developed, type-checked and render-tested on 8.20.x (`devDependencies`
  `~8.20.1`).
- The cubemap upload registers a `TextureUploaderWebGL` extension, which
  PixiJS added in 8.19; nothing older can load a `Cubemap`.
- PixiJS v5, v6 and v7 are not supported by this fork. Use upstream Pixi3D
  2.5 for those.

## Current state

- `npx tsc --noEmit -p tsconfig.json` reports **0 errors**; every module in
  `src/` compiles against v8.
- **Rendered on PixiJS 8.20.1** in the harness (below), with no shader
  compile errors:
  - `#cube`: a lit `StandardMaterial` cube on a plane (the render core).
  - `#teapot`: a glTF model through `Assets` (loaders, glTF parser, `Model`).
  - `#material`: a custom `Material.from` shader.
  - `#demo`: upstream's demo in full, with image-based lighting from
    cubemaps, a shadow-casting directional light with soft (blurred)
    shadows, and orbit control.
  - `#sprite`: `Sprite3D` with each billboard type, sorted back to front and
    depth tested against meshes; a tinted, faded sprite with a
    non-premultiplied texture and its own pixels per unit; and a
    `CompositeSprite` rendering a model that is not on the stage, at half
    resolution, with a blur filter.
- **Not verified yet:** picking, the skybox, animation, skinning, morphing,
  instancing, the WebGL1 path, and the upstream snapshot test suite.

### v8 differences found by rendering

Each of these type-checked cleanly and still drew the wrong thing.

- **`x` and `y` bypassed the 3D position.** v8's `Container.x`/`y` accessors
  read and write its 2D `_position` directly, so `container.y = 1` changed
  nothing in 3D. `Container3D` now overrides both, as it already did `z`.
- **The shadow blur failed to compile on WebGL2**, which v8 uses by default:
  it was built without the WebGL version defines and used `texture2D`.
- **Loader parsers need `name` beside `id`.** `name` is deprecated in 8.20,
  but the `Assets` loader still validates parsers by it, and reports every
  parser without one as a conflict.
- **glTF nodes set `label`**, v8's name for a container's name; `name` still
  reads it through v8's deprecated alias.
- **Render pipes get no calls from the renderer's runners.** v8 constructs
  pipes but only systems join `prerender`, `renderStart` and the rest, so the
  pipeline's per-frame clear of its passes never ran. A shadow map then kept
  the last frame's shadow whenever no mesh cast one (remove the caster and
  its shadow stayed on the ground). The pipeline now joins `renderStart`
  itself.
- **Pipes are created before the WebGL context**, and the shadow pass needs
  it (its shaders depend on the WebGL version). The pipeline creates the
  shadow pass on `contextChange`, so `renderPasses` is `[shadow, material]`
  and `shadowPass` a plain property again, as in 2.5.0.
- **3D rendered to a texture is still upside down** relative to 2D content,
  as in v7, so `CompositeSprite` keeps its flipped texture (`rotate: 8`).
  It renders through its own render target with a depth buffer; v8 creates
  targets for a texture without one.
- **A sprite's quad comes from `visualBounds`**, which includes the texture
  trim; v8's `bounds` does not.

## Differences from 2.5.0 so far

For the migration note (step 1 below); each is forced by v8.

- **`Point3D.magnitude` is a method**, `magnitude()`. `Point3D` and
  `Quaternion` extend `ObservablePoint` again, as they did in 2.5.0, so a
  `Container3D` is a `Container` to TypeScript and `stage.addChild(model)`
  type-checks. v8's typings declare math-extras' `magnitude()` method on every
  `ObservablePoint`, and a getter cannot satisfy it. `normalize` keeps its
  2.5.0 signature through an overload.
- **`SpriteBatchRenderer` is a v8 `Batcher`**: `render(sprites)` draws a
  sorted list of sprites. v7's object renderer API (`start`, `render(sprite)`,
  `flush`, `stop`) has no v8 equivalent.
- **`StandardPipeline` is a render pipe**, reached as
  `renderer.renderPipes.pipeline` rather than `renderer.plugins.pipeline`,
  and no longer extends `ObjectRenderer`.
- **`CompositeSpriteOptions.objectToRender` is a `Container`**; v8 has no
  `DisplayObject`.
- **`Sprite3D.blendMode` takes v8's blend mode names** (`"normal"`, `"add"`,
  ...). It is `"normal"` by default, as it was, and does not inherit from the
  containers above the sprite.
- **Rounding a sprite's corners (`roundPixels`) uses the renderer's
  resolution**; v7 used the global `settings.RESOLUTION`, which v8 does not
  have.

## What's next, in dependency order

1. API parity audit: diff the 2.5.0 `types/index.d.ts` against the port's and
   restore anything changed without need; write `MIGRATION_V8.md`, starting
   from the list above.
2. Port the puppeteer/pixelmatch suite (`test/`) to v8 and run it against the
   existing v7 snapshots. A snapshot is re-baselined only when the
   difference is shown to come from PixiJS itself.
3. Package shape for the first tag: v8-only exports (the `pixi5`/`pixi7`
   export map goes), built `dist/` and `types/`, and a v8 getting-started in
   the README.

## Render harness

```
npx rollup -w -c rollup.harness.mjs
```

serves `serve/` on http://127.0.0.1:8080. Pick a scene with the hash (`#cube`,
`#teapot`, `#material`, `#demo`, `#sprite`). The bundle includes the `pixi.js` from
`node_modules`, so the harness always runs the version the port is built
against. A page sets `window.__PIXI3D_READY__` when its scene is built,
`window.__PIXI3D_ERROR__` if building it threw, and collects every shader
that failed to compile, with its source, in `window.__PIXI3D_SHADER_ERRORS__`
(Pixi3D compiles its mesh shaders outside PixiJS' program cache, so such a
failure otherwise shows only as a mesh that never draws).

## Explicitly out of scope for this port

- WebGPU/Canvas backends — pixi3d is WebGL-only by design (hand-written
  GLSL), and this port only targets v8's WebGL backend to match. Do not
  "fix" `getGlContext()`'s cast by trying to make it WebGPU-safe.
- `@pixi/webworker` — not used by pixi3d, not touched.

## Toolchain notes

- The library build (`rollup.build.js`) still targets the old package
  layout, so `npm run build` does not work yet; see step 3 above.
- `typedoc` 0.22 predates the TypeScript 5 this port needs, so the lockfile
  is resolved with legacy peer dependencies until the docs step updates it.

## glTF / loader slice

`src/gltf/**`, `src/loader/**`, `src/model.ts` and `src/instanced-model.ts`
compile against v8 and render (the `#teapot` and `#demo` scenes).

- **Loading is `Assets` + `extensions.add(LoadParser)`.** The removed
  `@pixi/loaders` plugin flow (`Compatibility.installLoaderPlugin`,
  `setLoaderResourceExtensionType`, `Compatibility.assets`) is gone. Each of
  `src/loader/{gltf,gltf-binary,cubemap,shader-source}-loader.ts` is now a
  `LoaderParser` registered at import time; the public results are
  unchanged: `Assets.load("x.gltf" | "x.glb")` -> `glTFAsset`,
  `Assets.load("x.cubemap")` -> `Cubemap`, `Assets.load("x.vert" | ".frag" |
  ".glsl")` -> `string`. Extension matching uses v8's `checkExtension` (exact
  extension, query string stripped) rather than the old `url.includes(".gltf")`.
- **Dependent resources.** External glTF buffers are fetched directly with
  `DOMAdapter.get().fetch`; external glTF images and cubemap faces are loaded
  through the `Loader` instance the parser receives (so they share its
  promise cache) and fall back to `Assets.load` outside a parser
  (`glTFAsset.fromURL`). Relative uris resolve against the glTF/cubemap file
  url, as before.
- **`glTFResourceLoader` is now promise-based**: `loadBuffer(uri):
  Promise<ArrayBuffer>` and `loadTexture(uri): Promise<Texture>` replace the
  callback `load(uri, onComplete: (resource: ILoaderResource) => void)`.
  `glTFUrlResourceLoader` in `gltf-asset.ts` is the default implementation.
  `glTFAsset.load` / `glTFAsset.fromBuffer` return promises (the optional
  callback still fires for source compatibility); `fromBuffer` takes an
  optional resource loader so a `.glb` with external uris loads too.
- **Embedded / binary-chunk images** are decoded up front with
  `createImageBitmap(blob, { premultiplyAlpha: "none" })` (HTMLImageElement
  fallback) and wrapped in `new Texture({ source: new ImageSource(...) })`,
  since v8's `Texture.from(url)` is a cache lookup, not a load.
- **glTF sampler mapping** (`gltf-parser.ts`): each glTF texture gets its
  own `ImageSource` over the shared decoded resource (v8 keeps sampling state
  on the source, so this is the equivalent of v7's per-texture
  `BaseTexture`). `wrapS`/`wrapT` -> `style.addressModeU/V`
  (`repeat` / `clamp-to-edge` / `mirror-repeat`), `magFilter`/`minFilter` ->
  `style.magFilter/minFilter/mipmapFilter` (`nearest` / `linear`),
  and the `*_MIPMAP_*` min filters -> `autoGenerateMipmaps: true`. When a
  sampler omits filters, trilinear + mipmaps is used (the glTF sample viewer's
  choice); v7 only honoured `wrapS`. Alpha stays `no-premultiply-alpha`.
  `Texture.clone()` is gone, so material textures are `new Texture({ source })`
  over the parsed texture (`parseTextureInfo`, which also folds the five
  duplicated `KHR_texture_transform` blocks into one).
- `Model.getBoundingBox` calls `updateTransform3D()`; v8's
  `Container.updateTransform()` is a different (2D) method.
- `src/index.ts`: dropped the `@pixi/mixin-get-child-by-name` type reference
  (v8 ships `getChildByName`/`getChildByLabel` itself).

Caveats:

- Parsers register no `unload`; glTF textures share sources with the
  loader-cached image textures, so an unload that destroys sources needs a
  decision about ownership first.
- The geometry of a mesh carries every attribute its glTF primitive has, and
  v8 warns once per attribute a shader does not use ("Attribute a_Tangent is
  not present in the shader"). Harmless, but noisy; worth quieting when the
  geometry path is next touched.
