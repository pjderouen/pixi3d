import { TextureSource } from "pixi.js";
import { StandardMaterialTexture } from "./standard-material-texture";
/**
 * Represents a texture which holds specific data for a normal map.
 */
export declare class StandardMaterialNormalTexture extends StandardMaterialTexture {
    scale?: number | undefined;
    uvSet?: number | undefined;
    /**
     * Creates a new texture from the specified texture source.
     * @param source The texture source.
     * @param scale The scale of the normal.
     * @param uvSet The uv set to use (0 or 1).
     */
    constructor(source: TextureSource, scale?: number | undefined, uvSet?: number | undefined);
}
