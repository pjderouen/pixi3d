import { GlProgram } from "pixi.js";
/**
 * Makes the sources of a GLSL ES 1.00 (WebGL 1) program valid again after
 * PixiJS v8 has prepared them, before the program is first compiled.
 *
 * PixiJS v8 puts a `#define SHADER_NAME` line, a block of WebGL 1 defines
 * and a precision statement at the top of every GLSL ES 1.00 source. GLSL
 * ES 1.00 requires a `#version` directive to come first and extension
 * directives to come before any statement, so a shader with either would
 * not compile. PixiJS v7 left a source that started with a directive alone.
 * The version directive is moved back to the top, and a precision statement
 * above an extension directive down to the first statement after the last
 * one. Sources for GLSL ES 3.00 (WebGL 2) are left as they are.
 * @param program The program to fix.
 */
export declare function fixGlslEs100Program(program: GlProgram): void;
