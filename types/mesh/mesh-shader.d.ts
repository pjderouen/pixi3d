import { Shader, GlProgram, State, Geometry, WebGLRenderer, Topology } from "pixi.js";
import { Mesh3D } from "./mesh";
import { MeshGeometry3D } from "./geometry/mesh-geometry";
import { UniformValues } from "./mesh-shader-uniforms";
/**
 * Shader used specifically to render a mesh.
 */
export declare class MeshShader extends Shader {
    private _state;
    /**
     * Uniform values keyed by GLSL uniform name. Assigned by materials each
     * render and uploaded by `render` (see mesh-shader-uniforms.ts for why
     * this bypasses v8's UniformGroup sync).
     */
    uniforms: UniformValues;
    /**
     * Creates a new mesh shader from a WebGL program.
     * @param program The compiled program (see `GlProgram.from`).
     */
    constructor(program: GlProgram);
    /** The name of the mesh shader. Used for figuring out if geometry attributes is compatible with the shader. This needs to be set to something different than default value when custom attributes is used. */
    get name(): string;
    /**
     * Creates geometry with required attributes used by this shader. Override when using custom attributes.
     * @param geometry The geometry with mesh data.
     * @param instanced Value indicating if the geometry will be instanced.
     */
    createShaderGeometry(geometry: MeshGeometry3D, instanced: boolean): Geometry;
    /**
     * Renders the geometry of the specified mesh.
     * @param mesh Mesh to render.
     * @param renderer Renderer to use.
     * @param state Rendering state to use.
     * @param topology Draw mode (topology) to use.
     */
    render(mesh: Mesh3D, renderer: WebGLRenderer, state?: State, topology?: Topology): void;
}
