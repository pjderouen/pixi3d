import { Texture, TextureSource } from "pixi.js"
import { TextureTransform } from "../../texture/texture-transform"

/**
 * Represents a texture which can have a transform.
 */
export class StandardMaterialTexture extends Texture {
  /** The transform to use for this texture. */
  transform?: TextureTransform

  /**
   * Creates a new texture from the specified texture source.
   * @param source The texture source. (v8 renamed BaseTexture -> TextureSource;
   * Texture now wraps a source rather than a base texture directly.)
   * @param uvSet The uv set to use (0 or 1).
   */
  constructor(source: TextureSource, public uvSet?: number) {
    super({ source })
  }
}
