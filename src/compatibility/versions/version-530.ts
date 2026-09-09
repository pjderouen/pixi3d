import { Renderer, RenderTexture, InteractionManager, DisplayObject, AssetsClass, Loader, LoaderResource } from "pixi.js"
import { CompatibilityVersion, LoaderResourceResponseType } from "../compatibility-version"
// #if _PIXI_COMPATIBILITY_LOADERS
// #endif

export class Version530 implements CompatibilityVersion {
  setLoaderResourceExtensionType(extension: string, type: LoaderResourceResponseType): void {
    let responseType = LoaderResource.XHR_RESPONSE_TYPE.TEXT
    if (type === LoaderResourceResponseType.buffer) {
      responseType = LoaderResource.XHR_RESPONSE_TYPE.BUFFER
    } else if (type === LoaderResourceResponseType.json) {
      responseType = LoaderResource.XHR_RESPONSE_TYPE.JSON
    }
    LoaderResource.setExtensionXhrType(extension, responseType)
  }
  getInteractionPlugin(renderer: Renderer): InteractionManager | undefined {
    return renderer.plugins.interaction
  }
  get assets(): AssetsClass | undefined {
    return undefined
  }
  isRendererDestroyed(renderer: Renderer): boolean {
    return !renderer.gl
  }
  installRendererPlugin(name: string, plugin: any): void {
    Renderer.registerPlugin(name, plugin)
  }
  installLoaderPlugin(name: string, plugin: any): void {
    Loader.registerPlugin(plugin)
  }
  render(renderer: Renderer, object: DisplayObject, renderTexture: RenderTexture): void {
    renderer.render(object, renderTexture)
  }
}