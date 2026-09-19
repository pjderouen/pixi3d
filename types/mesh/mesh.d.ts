import { InstructionSet, Renderer, RenderLayer } from "pixi.js";
import { MeshGeometry3D } from "./geometry/mesh-geometry";
import { Container3D } from "../container";
import { Skin } from "../skinning/skin";
import { InstancedMesh3D } from "./instanced-mesh";
import { Material } from "../material/material";
import { MeshDestroyOptions } from "./mesh-destroy-options";
import { AABB } from "../math/aabb";
import { CircleGeometryOptions } from "./geometry/circle-geometry";
import { CylinderGeometryOptions } from "./geometry/cylinder-geometry";
import { SphereGeometryOptions } from "./geometry/sphere-geometry";
/**
 * Represents a mesh which contains geometry and has a material.
 */
export declare class Mesh3D extends Container3D {
    geometry: MeshGeometry3D;
    material?: Material | undefined;
    /**
     * The name of the render pipe used for rendering the mesh (the v8
     * equivalent of a renderer plugin).
     */
    renderPipeId: string;
    /** @deprecated Use `renderPipeId`. */
    get pluginName(): string;
    set pluginName(value: string);
    /** Array of weights used for morphing between geometry targets. */
    targetWeights?: number[];
    /** The skin used for vertex skinning. */
    skin?: Skin;
    /** The enabled render passes for this mesh. */
    enabledRenderPasses: {
        [name: string]: unknown;
    };
    /** Used for sorting the mesh before render. */
    renderSortOrder: number;
    /**
     * Creates a new mesh with the specified geometry and material.
     * @param geometry The geometry for the mesh.
     * @param material The material for the mesh. If the material is empty the mesh won't be rendered.
     */
    constructor(geometry: MeshGeometry3D, material?: Material | undefined);
    private _instances;
    /** An array of instances created from this mesh. */
    get instances(): InstancedMesh3D[];
    /**
     * Creates a new instance of this mesh.
     */
    createInstance(): InstancedMesh3D;
    /**
     * Removes an instance from this mesh.
     * @param instance The instance to remove.
     */
    removeInstance(instance: InstancedMesh3D): void;
    /**
     * Enables the render pass with the specified name.
     * @param name The name of the render pass to enable.
     */
    enableRenderPass(name: string, options?: unknown): void;
    /**
     * Disables the render pass with the specified name.
     * @param name The name of the render pass to disable.
     * @param options The options for the render pass.
     */
    disableRenderPass(name: string): void;
    /**
     * Returns a value indicating if the specified render pass is enabled.
     * @param name The name of the render pass to check.
     */
    isRenderPassEnabled(name: string): boolean;
    /**
     * Destroys the mesh and it's used resources.
     */
    destroy(options?: boolean | MeshDestroyOptions): void;
    /**
     * Hands the mesh to its render pipe while the renderer builds its
     * instruction set, then lets the children collect themselves as usual.
     * @internal
     */
    collectRenderablesSimple(instructionSet: InstructionSet, renderer: Renderer, currentLayer: RenderLayer): void;
    /**
     * Calculates and returns a axis-aligned bounding box of the mesh in world space.
     */
    getBoundingBox(): AABB | undefined;
    /**
     * Creates a new quad (flat square) mesh with the specified material.
     * @param material The material to use.
     */
    static createQuad(material?: Material): Mesh3D;
    /**
     * Creates a new cube (six faces) mesh with the specified material.
     * @param material The material to use.
     */
    static createCube(material?: Material): Mesh3D;
    /**
     * Creates a new plane (flat square) mesh with the specified material.
     * @param material The material to use.
     */
    static createPlane(material?: Material): Mesh3D;
    /**
     * Creates a new uv sphere mesh with the specified material.
     * @param material The material to use.
     * @param options The options used when creating the geometry.
     */
    static createSphere(material?: Material, options?: SphereGeometryOptions): Mesh3D;
    /**
     * Creates a new uv circle mesh with the specified material.
     * @param material The material to use.
     * @param options The options used when creating the geometry.
     */
    static createCircle(material?: Material, options?: CircleGeometryOptions): Mesh3D;
    /**
     * Creates a new uv cylinder mesh with the specified material.
     * @param material The material to use.
     * @param options The options used when creating the geometry.
     */
    static createCylinder(material?: Material, options?: CylinderGeometryOptions): Mesh3D;
}
