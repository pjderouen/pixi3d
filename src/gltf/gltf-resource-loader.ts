import type { Texture } from "pixi.js"

/**
 * Represents a loader for external glTF asset resources (buffers and images).
 * Uris are given exactly as they appear in the glTF descriptor, relative to
 * the descriptor's own location.
 */
export interface glTFResourceLoader {
  /**
   * Loads binary data (a `.bin` buffer) from the specified uri.
   * @param uri The uri to load from.
   */
  loadBuffer(uri: string): Promise<ArrayBuffer>

  /**
   * Loads an image as a texture from the specified uri.
   * @param uri The uri to load from.
   */
  loadTexture(uri: string): Promise<Texture>
}
