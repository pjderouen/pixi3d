import { WebGLRenderer } from "pixi.js";
import { MeshShader } from "../../mesh/mesh-shader";
import { StandardShader } from "./standard-shader";
import { Material } from "../material";
import { Camera } from "../../camera/camera";
import { LightingEnvironment } from "../../lighting/lighting-environment";
import { Mesh3D } from "../../mesh/mesh";
import { StandardMaterialAlphaMode } from "./standard-material-alpha-mode";
import { StandardMaterialDebugMode } from "./standard-material-debug-mode";
import { ShadowCastingLight } from "../../shadow/shadow-casting-light";
import { Color } from "../../color";
import { InstancedStandardMaterial } from "./instanced-standard-material";
import { StandardMaterialOcclusionTexture } from "./standard-material-occlusion-texture";
import { StandardMaterialNormalTexture } from "./standard-material-normal-texture";
import { StandardMaterialTexture } from "./standard-material-texture";
/**
 * The standard material is using Physically-Based Rendering (PBR) which makes
 * it suitable to represent a wide range of different surfaces. It's the default
 * material when loading models from file.
 */
export declare class StandardMaterial extends Material {
    private _lightingEnvironment?;
    private _lightingEnvironmentConfigId;
    private _unlit;
    private _alphaMode;
    private _debugMode?;
    private _baseColorTexture?;
    private _baseColorFactor;
    private _normalTexture?;
    private _occlusionTexture?;
    private _emissiveTexture?;
    private _metallicRoughnessTexture?;
    private _shadowCastingLight?;
    private _instancingEnabled;
    private _skinUniforms;
    /** The roughness of the material. */
    roughness: number;
    /** The metalness of the material. */
    metallic: number;
    /** The base color of the material. */
    baseColor: Color;
    /** The cutoff threshold when alpha mode is set to "mask". */
    alphaCutoff: number;
    /** The emissive color of the material. */
    emissive: Color;
    /** The exposure (brightness) of the material. */
    exposure: number;
    /** The base color texture. */
    get baseColorTexture(): StandardMaterialTexture | undefined;
    set baseColorTexture(value: StandardMaterialTexture | undefined);
    /** The metallic-roughness texture. */
    get metallicRoughnessTexture(): StandardMaterialTexture | undefined;
    set metallicRoughnessTexture(value: StandardMaterialTexture | undefined);
    /** The normal map texture. */
    get normalTexture(): StandardMaterialNormalTexture | undefined;
    set normalTexture(value: StandardMaterialNormalTexture | undefined);
    /** The occlusion map texture. */
    get occlusionTexture(): StandardMaterialOcclusionTexture | undefined;
    set occlusionTexture(value: StandardMaterialOcclusionTexture | undefined);
    /** The emissive map texture. */
    get emissiveTexture(): StandardMaterialTexture | undefined;
    set emissiveTexture(value: StandardMaterialTexture | undefined);
    /** The alpha rendering mode of the material. */
    get alphaMode(): StandardMaterialAlphaMode;
    set alphaMode(value: StandardMaterialAlphaMode);
    /** The shadow casting light of the material. */
    get shadowCastingLight(): ShadowCastingLight | undefined;
    set shadowCastingLight(value: ShadowCastingLight | undefined);
    /** The debug rendering mode of the material. */
    get debugMode(): StandardMaterialDebugMode | undefined;
    set debugMode(value: StandardMaterialDebugMode | undefined);
    /**
     * The camera used when rendering a mesh. If this value is not set, the main
     * camera will be used by default.
     */
    camera?: Camera;
    /**
     * Lighting environment used when rendering a mesh. If this value is not set,
     * the main lighting environment will be used by default.
     */
    get lightingEnvironment(): LightingEnvironment | undefined;
    set lightingEnvironment(value: LightingEnvironment | undefined);
    /**
     * Value indicating if the material is unlit. If this value if set to true,
     * all lighting is disabled and only the base color will be used.
     */
    get unlit(): boolean;
    set unlit(value: boolean);
    destroy(): void;
    /**
     * Invalidates the shader so it can be rebuilt with the current features.
     */
    invalidateShader(): void;
    /**
     * Creates a new standard material from the specified source.
     * @param source Source from which the material is created.
     */
    static create(source: unknown): StandardMaterial;
    render(mesh: Mesh3D, renderer: WebGLRenderer): void;
    get isInstancingSupported(): boolean;
    createInstance(): InstancedStandardMaterial;
    createShader(mesh: Mesh3D, renderer: WebGLRenderer): StandardShader | undefined;
    updateUniforms(mesh: Mesh3D, shader: MeshShader): void;
}
