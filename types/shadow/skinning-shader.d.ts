import { WebGLRenderer } from "pixi.js";
import { MeshGeometry3D } from "../mesh/geometry/mesh-geometry";
import { Mesh3D } from "../mesh/mesh";
import { ShadowCastingLight } from "./shadow-casting-light";
import { ShadowShader } from "./shadow-shader";
export declare class SkinningShader extends ShadowShader {
    private _maxSupportedJoints;
    get maxSupportedJoints(): number;
    static getMaxJointCount(renderer: WebGLRenderer): number;
    constructor(renderer: WebGLRenderer);
    createShaderGeometry(geometry: MeshGeometry3D, instanced: boolean): import("pixi.js").Geometry;
    get name(): string;
    updateUniforms(mesh: Mesh3D, shadowCastingLight: ShadowCastingLight): void;
}
