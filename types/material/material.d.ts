import { BLEND_MODES, State, WebGLRenderer, Topology } from "pixi.js";
import { Mesh3D } from "../mesh/mesh";
import { MaterialRenderSortType } from "./material-render-sort-type";
import { MeshShader } from "../mesh/mesh-shader";
/**
 * Materials are used to render a mesh with a specific visual appearance.
 */
export declare class Material {
    protected _renderSortType: MaterialRenderSortType;
    protected _shader?: MeshShader;
    /** State used to render a mesh. */
    state: State & {
        culling: boolean;
        clockwiseFrontFace: boolean;
        depthTest: boolean;
    };
    /** Draw mode (topology) used to render a mesh. */
    drawMode: Topology;
    /**
     * Sort type used to render a mesh. Transparent materials will be rendered
     * after opaque materials.
     */
    renderSortType: MaterialRenderSortType;
    /**
     * Value indicating if writing into the depth buffer is enabled or disabled.
     */
    get depthMask(): boolean;
    set depthMask(value: boolean);
    /**
     * Value indicating if the material is double sided. When set to true, the
     * culling state will be set to false.
     */
    get doubleSided(): boolean;
    set doubleSided(value: boolean);
    /** Blend mode used to render a mesh. */
    get blendMode(): BLEND_MODES;
    set blendMode(value: BLEND_MODES);
    /**
     * Creates a shader used to render the specified mesh.
     * @param mesh The mesh to create the shader for.
     * @param renderer The renderer to use.
     */
    createShader(mesh: Mesh3D, renderer: WebGLRenderer): MeshShader | undefined;
    /**
     * Updates the uniforms for the specified shader.
     * @param mesh The mesh used for updating the uniforms.
     * @param shader The shader to update.
     */
    updateUniforms?(mesh: Mesh3D, shader: MeshShader): void;
    /**
     * Destroys the material and it's used resources.
     */
    destroy(): void;
    /**
     * Returns a value indicating if this material supports instancing.
     */
    get isInstancingSupported(): boolean;
    /**
     * Creates a new instanced version of this material.
     */
    createInstance(): unknown;
    /**
     * Renders the specified mesh.
     * @param mesh The mesh to render.
     * @param renderer The renderer to use.
     */
    render(mesh: Mesh3D, renderer: WebGLRenderer): void;
    /**
     * Creates a new material from the specified vertex/fragment source.
     * @param vertexSrc The vertex shader source.
     * @param fragmentSrc The fragment shader source.
     * @param updateUniforms The function which will be called for updating the
     * shader uniforms.
     */
    static from(vertexSrc: string, fragmentSrc: string, updateUniforms?: (mesh: Mesh3D, shader: MeshShader) => void): Material;
}
