import { TextureSource } from "pixi.js";
import { StandardMaterialTexture } from "./standard-material-texture";
/**
 * Represents a texture which holds specific data for a occlusion map.
 */
export declare class StandardMaterialOcclusionTexture extends StandardMaterialTexture {
    strength?: number | undefined;
    uvSet?: number | undefined;
    /**
     * Creates a new texture from the specified texture source.
     * @param source The texture source.
     * @param strength The strength of the occlusion.
     * @param uvSet The uv set to use (0 or 1).
     */
    constructor(source: TextureSource, strength?: number | undefined, uvSet?: number | undefined);
}
