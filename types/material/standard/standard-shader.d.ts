import { WebGLRenderer, State, Topology } from "pixi.js";
import { MeshGeometry3D } from "../../mesh/geometry/mesh-geometry";
import { Mesh3D } from "../../mesh/mesh";
import { MeshShader } from "../../mesh/mesh-shader";
export declare class StandardShader extends MeshShader {
    private _instancing;
    static build(renderer: WebGLRenderer, features: string[]): StandardShader;
    get name(): string;
    createShaderGeometry(geometry: MeshGeometry3D, instanced: boolean): import("pixi.js").Geometry;
    render(mesh: Mesh3D, renderer: WebGLRenderer, state: State, topology: Topology): void;
}
