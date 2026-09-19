import { WebGLRenderer } from "pixi.js";
/**
 * A bag of uniform values keyed by GLSL uniform name, the shape Pixi3D's
 * materials have always written to (`shader.uniforms.u_ModelMatrix = ...`).
 */
export type UniformValues = {
    [name: string]: unknown;
};
/**
 * Uploads a uniform bag to the currently bound program.
 *
 * PixiJS v8 syncs uniforms through typed `UniformGroup`s whose layout must
 * be declared up front, which does not fit shaders assembled from feature
 * defines (the set of active uniforms is only known after compilation) nor
 * struct-array names such as `u_Lights[0].color`. So the mesh shader binds
 * its program with `skipSync` and this function uploads straight from the
 * program's reflected uniform data instead, the way v7's sync did.
 *
 * Textures are bound through the renderer's texture system so its unit
 * bookkeeping stays coherent with the rest of the frame.
 */
export declare function syncUniforms(renderer: WebGLRenderer, program: import("pixi.js").GlProgram, values: UniformValues): void;
