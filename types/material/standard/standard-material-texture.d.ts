import { Texture, TextureSource } from "pixi.js";
import { TextureTransform } from "../../texture/texture-transform";
/**
 * Represents a texture which can have a transform.
 */
export declare class StandardMaterialTexture extends Texture {
    uvSet?: number | undefined;
    /** The transform to use for this texture. */
    transform?: TextureTransform;
    /**
     * Whether the texture can be sampled. Always true in PixiJS v8, where a
     * Texture only exists once its resource has loaded (see `Assets`); kept for
     * the feature-set checks written against v7's lazily-loaded textures.
     */
    get valid(): boolean;
    /**
     * Creates a new texture from the specified texture source.
     * @param source The texture source. (v8 renamed BaseTexture -> TextureSource;
     * Texture now wraps a source rather than a base texture directly.)
     * @param uvSet The uv set to use (0 or 1).
     */
    constructor(source: TextureSource, uvSet?: number | undefined);
}
