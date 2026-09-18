import type { LoaderParser } from "pixi.js";
/**
 * Load parser for GLSL shader source files: `Assets.load("shader.frag")`
 * resolves to the file contents as a string.
 */
export declare const ShaderSourceLoader: LoaderParser<string>;
