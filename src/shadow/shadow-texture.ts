import { RenderTexture, WebGLRenderer } from "pixi.js"
import type { SCALE_MODE, TEXTURE_FORMATS } from "pixi.js"
import { Capabilities } from "../capabilities"
import { ShadowQuality } from "./shadow-quality"

export namespace ShadowTexture {
  export function create(renderer: WebGLRenderer, size: number, quality: ShadowQuality) {
    return RenderTexture.create({
      width: size,
      height: size,
      resolution: 1,
      format: getSupportedFormat(renderer, quality),
      scaleMode: getSupportedScaleMode(renderer),
      autoGenerateMipmaps: false,
    })
  }

  function getSupportedScaleMode(renderer: WebGLRenderer): SCALE_MODE {
    if (Capabilities.supportsFloatLinear(renderer)) {
      return "linear"
    }
    return "nearest"
  }

  function getSupportedFormat(renderer: WebGLRenderer, quality: ShadowQuality): TEXTURE_FORMATS {
    if (quality === ShadowQuality.high) {
      if (Capabilities.isFloatFramebufferSupported(renderer)) {
        return "rgba32float"
      }
      if (Capabilities.isHalfFloatFramebufferSupported(renderer)) {
        return "rgba16float"
      }
    }
    if (quality === ShadowQuality.medium && Capabilities.isHalfFloatFramebufferSupported(renderer)) {
      return "rgba16float"
    }
    return "rgba8unorm"
  }
}
