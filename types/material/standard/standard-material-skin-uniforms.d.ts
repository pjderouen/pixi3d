import { Mesh3D } from "../../mesh/mesh";
import { MeshShader } from "../../mesh/mesh-shader";
export declare class StandardMaterialSkinUniforms {
    private _jointMatrixTexture?;
    private _jointNormalTexture?;
    enableJointMatrixTextures(jointsCount: number): void;
    destroy(): void;
    update(mesh: Mesh3D, shader: MeshShader): void;
}
