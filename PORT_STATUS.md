# PixiJS v8 port status

Pixi3D (upstream: https://github.com/jnsmalm/pixi3d) has no PixiJS v8 support.
Its own issue tracker has an open v8 feature request since September 2024
and a closed duplicate from August 2024, neither acted on; the last commit
to the project was in May 2024. This fork exists to port it to v8 so it can
be used in a v8 project. Branch: `pixi-v8-port`.

## Current state

`npx tsc --noEmit -p tsconfig.json` (against `pixi.js@8` as a devDependency)
reports **457 errors** across the 132-file, ~8,100-line source tree,
down from ~472 after the initial mechanical pass. Nothing has been built
or rendered yet — every claim below is a compile-time claim, not a runtime
one. **Do not treat a file as done until it has been checked against real
rendered output**, not just `tsc`; the hardest remaining pieces
(shaders, the render pipeline) can type-check cleanly and still draw
nothing or draw garbage.

### Done and typecheck-verified

- All `@pixi/*` sub-package imports (`@pixi/core`, `@pixi/constants`,
  `@pixi/display`, `@pixi/math`, `@pixi/sprite`, `@pixi/utils`,
  `@pixi/ticker`, `@pixi/settings`, `@pixi/interaction`, `@pixi/assets`,
  `@pixi/loaders`) consolidated into the single `pixi.js` v8 package
  (68 files).
- Shape-preserving renames: `IDestroyOptions`→`DestroyOptions`,
  `IPointData`→`PointData`, `IBatchableElement`→`BatchableElement`.
- `src/capabilities.ts` + new `src/compatibility/gl-context.ts`: raw GL
  capability probing now prefers v8's already-detected
  `(renderer as WebGLRenderer).context.extensions.*` flags over manual
  `gl.getExtension()` calls, with a single documented cast
  (`getGlContext()`) for the handful of call sites that still need the raw
  `WebGL2RenderingContext` (`GlContextSystem.gl` is `protected` in v8's
  public types since v8 also supports WebGPU/Canvas backends; pixi3d is
  WebGL-only so the cast is safe here, not elsewhere).
- `src/material/standard/standard-material-{texture,normal-texture,
  occlusion-texture,matrix-texture}.ts`: `BaseTexture`→`TextureSource`
  throughout; `StandardMaterialMatrixTexture` now uses v8's
  `BufferImageSource` (infers `rgba32float` from the `Float32Array`
  directly) instead of the old `BaseTexture(BufferResource, {format:
  FORMATS.RGBA, type: TYPES.FLOAT})` construction, making
  `compatibility/buffer-resource.ts` unnecessary for this call site (other
  call sites still use it — not yet audited).

### Error inventory (`tsc` codes, most to least common)

| Code | Count | Cause |
|---|---|---|
| TS2339 | 227 | Property doesn't exist — mostly `.baseTexture`, `.gl`, old renderer-plugin properties |
| TS2345 | 80 | Argument type mismatches, largely from the enum→string-literal changes below |
| TS2554 | 42 | Constructor/call arity changes (`Shader`, `Program`, `Ticker` callback) |
| TS2305/2724 | ~60 | Removed or renamed exports (table below) |
| TS18048 | 17 | New strict-null cases from v8's stricter public types |
| TS2416 | 15 | Method signature mismatches on overrides (mostly the `ObjectRenderer` subclass) |
| TS2551 | 11 | Near-miss identifiers (`extensions.add` vs old `registerPlugin`, etc.) |

### Confirmed removed/renamed exports still to fix

| v7 symbol | v8 replacement | Where used |
|---|---|---|
| `BaseTexture` | `Texture` (wraps `TextureSource`) | `cubemap/cubemap.ts`, `cubemap/mipmap-resource.ts`, `gltf/gltf-parser.ts` (texture module done) |
| `DisplayObject` | `Container` (type only — v8 collapsed the hierarchy) | 5 files |
| `settings` (global) | `AbstractRenderer.defaultOptions` / per-instance options / `DOMAdapter` | 5 files |
| `InteractionManager`, `InteractionEvent` | `EventSystem`, `FederatedPointerEvent` (`renderer.events`) | `camera/camera-orbit-control.ts`, `picking/*` (6 uses) |
| `FORMATS`, `TYPES`, `TARGETS`, `MIPMAP_MODES` (GL-constant enums) | `TEXTURE_FORMATS` string union (e.g. `'rgba8unorm'`, `'rgba32float'`) + `autoGenerateMipmaps: boolean`; see `src/material/standard/standard-material-matrix-texture.ts` for a worked example | `gltf/gltf-parser.ts` (glTF `format`/`sampler` mapping — the biggest remaining single-file job), `cubemap/*` |
| `LoaderResource`, `Resource`, `ILoaderResource`, `@pixi/loaders` | `Assets.add({alias, src})` / `Assets.load()` — the whole loader flow, not a rename | `src/loader/*` (4 files: `cubemap-loader.ts`, `gltf-binary-loader.ts`, `gltf-loader.ts`, `shader-source-loader.ts`) |
| `Program`, `Shader.from(vertex, fragment, uniforms)` | `GlProgram.from({vertex, fragment})` + `Shader.from({gl: {vertex, fragment}, resources})`; **textures move out of uniforms into `resources`**; uniforms need `{value, type}` wrappers | `material/standard/*` shader construction, `sprite/sprite-batch-renderer.ts` |
| `ObjectRenderer`, `Renderer.registerPlugin`, `IRendererPlugin`, `BatchShaderGenerator`, `BatchRenderer` | `RenderPipe<T>` interface (`addRenderable`/`updateRenderable`/`validateRenderable`/`destroyRenderable`) registered via `extensions.add({type: ExtensionType.WebGLPipes, name}, PipeClass)` — an architecturally different, instruction-deferred renderer-plugin system, not a mechanical rename | `pipeline/standard-pipeline.ts`, `sprite/sprite-batch-renderer.ts`, `compatibility/*` install helpers |

## What's next, in dependency order

1. **`gltf/gltf-parser.ts`** — the `FORMATS`/`TYPES`/`TARGETS` → `TEXTURE_FORMATS` mapping for every glTF `image.mimeType`/`sampler` combination the parser handles, plus its `BaseTexture` construction sites. High value: almost everything else (materials, textures, meshes) is loaded through this file.
2. **`src/loader/*`** (4 files) — rewrite atop `Assets.add`/`Assets.load` instead of the removed `@pixi/loaders` pipeline. Self-contained, no dependents block it.
3. **`camera/camera-orbit-control.ts` + `picking/*`** — `InteractionManager`/`InteractionEvent` → `EventSystem`/`FederatedPointerEvent`. `renderer.events` is the v8 entry point; check `container.eventMode` defaults changed from `'auto'` to `'passive'`.
4. **Shader/Program → GlProgram** (`material/standard/*`, `sprite/sprite-batch-renderer.ts`) — needs the actual GLSL source reviewed per shader, not just the wrapper API, since uniform declarations change shape and textures move to `resources`. Do this file-by-file with a real render test, not by pattern-matching.
5. **`pipeline/standard-pipeline.ts` + `sprite/sprite-batch-renderer.ts` → `RenderPipe`** — the architecturally hard one. `StandardPipeline` currently extends `ObjectRenderer` and is driven imperatively (`render()`/`flush()` called directly); v8's `RenderPipe` is invoked by the renderer's own instruction-execution pass via `addRenderable`/`updateRenderable`. The pragmatic route is likely to keep pixi3d's existing imperative per-mesh draw calls (it already bypasses Pixi's 2D batcher for meshes) inside `addRenderable`, rather than adopting v8's `InstructionSet` batching — but that needs a working render test to confirm it's actually invoked at the right point in the frame, not just a type-checks-clean guess. Everything upstream of this (the shader files) should land first so there's something correct to render.
6. **Sweep the remaining `DisplayObject`/`settings`/`IPoint` mechanical renames** — genuinely mechanical, can be done any time, left for last because they don't block anything.
7. **Get an actual render smoke test running.** `serve/` + `rollup.serve.js` already exist for this in the original repo — point them at the `pixi.js` v8 devDependency and get a spinning textured cube on screen before trusting anything in steps 1, 4, or 5.

## Explicitly out of scope for this port

- WebGPU/Canvas backends — pixi3d is WebGL-only by design (hand-written
  GLSL), and this port only targets v8's WebGL backend to match. Do not
  "fix" `getGlContext()`'s cast by trying to make it WebGPU-safe.
- `@pixi/webworker` — not used by pixi3d, not touched.

## Toolchain notes

- `pixi.js@8` and `typescript@5` are installed as `devDependencies` for
  this port's typecheck loop. The `rollup`/`esbuild` build config
  (`rollup.build.js`) still targets the old package layout and has not
  been touched — `npm run build` will not work yet.
- `package.json`'s dual `pixi5`/`pixi7` export map
  (`dist/{cjs,esm}/pixi{5,7}/pixi3d.js`) needs a decision: add a `pixi8`
  variant alongside them, or drop the multi-version build entirely and
  make this fork v8-only. Not decided yet.
