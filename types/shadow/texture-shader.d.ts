import { WebGLRenderer } from "pixi.js";
import { MeshGeometry3D } from "../mesh/geometry/mesh-geometry";
import { Mesh3D } from "../mesh/mesh";
import { ShadowCastingLight } from "./shadow-casting-light";
import { ShadowShader } from "./shadow-shader";
export declare class TextureShader extends ShadowShader {
    private _jointMatrixTexture;
    static isSupported(renderer: WebGLRenderer): boolean;
    get maxSupportedJoints(): number;
    constructor(renderer: WebGLRenderer);
    createShaderGeometry(geometry: MeshGeometry3D, instanced: boolean): import("pixi.js").Geometry;
    get name(): string;
    updateUniforms(mesh: Mesh3D, shadowCastingLight: ShadowCastingLight): void;
}
