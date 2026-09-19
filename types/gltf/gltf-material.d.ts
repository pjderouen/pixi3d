import { glTFTexture } from "./gltf-texture";
/**
 * glTF defines materials using a common set of parameters that are based on
 * widely used material representations from Physically-Based Rendering (PBR).
 */
export declare class glTFMaterial {
    alphaCutoff: number;
    alphaMode: string;
    doubleSided: boolean;
    roughness: number;
    metallic: number;
    baseColorTexture?: glTFTexture;
    metallicRoughnessTexture?: glTFTexture;
    normalTexture?: glTFTexture & {
        scale?: number;
    };
    occlusionTexture?: glTFTexture & {
        strength?: number;
    };
    emissiveTexture?: glTFTexture;
    emissiveFactor: number[];
    baseColor: number[];
    unlit: boolean;
}
