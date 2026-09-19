import { Cubemap } from "../cubemap/cubemap";
import { MeshShader } from "../mesh/mesh-shader";
import { Camera } from "../camera/camera";
import { Mesh3D } from "../mesh/mesh";
import { Material } from "../material/material";
export declare class SkyboxMaterial extends Material {
    private _cubemap;
    get cubemap(): Cubemap;
    set cubemap(value: Cubemap);
    camera?: Camera;
    exposure: number;
    constructor(cubemap: Cubemap);
    updateUniforms(mesh: Mesh3D, shader: MeshShader): void;
    createShader(): MeshShader | undefined;
}
