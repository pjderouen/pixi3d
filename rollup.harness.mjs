// Development harness for the PixiJS v8 port: bundles ONLY the modules that
// have been ported (imported from serve/src/index.ts) against a global PIXI
// v8 loaded from the CDN in serve/index.html, and serves it. Unlike
// rollup.serve.js it does not build the library's dist bundles first, so
// modules still being ported don't have to be import-safe yet.
//
//   npx rollup -w -c rollup.harness.mjs
//
import { fileURLToPath } from "url"
import { dirname, resolve as resolvePath } from "path"
import esbuild from "rollup-plugin-esbuild"
import image from "@rollup/plugin-image"
import resolve from "@rollup/plugin-node-resolve"
import serve from "rollup-plugin-serve"
import glsl from "./rollup-plugin-glsl.js"

const root = dirname(fileURLToPath(import.meta.url))

export default {
  input: resolvePath(root, "serve/src/index.ts"),
  external: ["pixi.js"],
  output: {
    file: resolvePath(root, "serve/bundle.js"),
    format: "iife",
    sourcemap: true,
    globals: { "pixi.js": "PIXI" },
  },
  plugins: [
    esbuild({ target: "es2020" }),
    image(),
    glsl(),
    resolve(),
    serve({
      host: "127.0.0.1",
      port: 8080,
      open: false,
      contentBase: [resolvePath(root, "serve")],
    }),
  ],
}
