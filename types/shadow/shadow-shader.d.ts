import { WebGLRenderer, Geometry, State } from "pixi.js";
import { MeshGeometry3D } from "../mesh/geometry/mesh-geometry";
import { MeshShader } from "../mesh/mesh-shader";
import { Mesh3D } from "../mesh/mesh";
import { ShadowCastingLight } from "./shadow-casting-light";
export declare class ShadowShader extends MeshShader {
    private _instancing;
    constructor(renderer: WebGLRenderer, features?: string[]);
    get maxSupportedJoints(): number;
    createShaderGeometry(geometry: MeshGeometry3D, instanced: boolean): Geometry;
    get name(): string;
    render(mesh: Mesh3D, renderer: WebGLRenderer, state: State): void;
    updateUniforms(mesh: Mesh3D, shadowCastingLight: ShadowCastingLight): void;
}
