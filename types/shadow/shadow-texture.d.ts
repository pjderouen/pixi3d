import { RenderTexture, WebGLRenderer } from "pixi.js";
import { ShadowQuality } from "./shadow-quality";
export declare namespace ShadowTexture {
    function create(renderer: WebGLRenderer, size: number, quality: ShadowQuality): RenderTexture;
}
