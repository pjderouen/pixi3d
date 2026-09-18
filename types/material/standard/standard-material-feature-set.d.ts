import { WebGLRenderer as Renderer } from "pixi.js";
import { MeshGeometry3D } from "../../mesh/geometry/mesh-geometry";
import { StandardMaterial } from "./standard-material";
import { LightingEnvironment } from "../../lighting/lighting-environment";
import { Mesh3D } from "../../mesh/mesh";
/**
 * Prefer uploading skin joint matrices as uniforms (when they fit) rather
 * than through a floating-point texture. Replaces the
 * `settings.PREFER_UNIFORMS_WHEN_UPLOADING_SKIN_JOINTS` flag piggybacked on
 * PixiJS's (now removed) global settings object.
 */
export declare let preferUniformsWhenUploadingSkinJoints: boolean;
export declare namespace StandardMaterialFeatureSet {
    function build(renderer: Renderer, mesh: Mesh3D, geometry: MeshGeometry3D, material: StandardMaterial, lightingEnvironment: LightingEnvironment): string[] | undefined;
    function hasSkinningTextureFeature(features: string[]): boolean;
}
