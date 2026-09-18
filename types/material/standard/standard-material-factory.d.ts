import { glTFTexture } from "../../gltf/gltf-texture";
import { TextureTransform } from "../../texture/texture-transform";
import { StandardMaterial } from "./standard-material";
export declare class StandardMaterialFactory {
    create(source: unknown): StandardMaterial;
    createTextureTransform(texture: glTFTexture): TextureTransform | undefined;
}
