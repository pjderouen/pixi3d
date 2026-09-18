import { WebGLRenderer, RenderTexture, RenderTarget } from "pixi.js";
import { ShadowCastingLight } from "./shadow-casting-light";
/**
 * Blurs a shadow texture by drawing a full-screen quad with a gaussian blur
 * shader into a render texture, once per axis. This goes through the mesh
 * shader path rather than PixiJS' filter system, which is built around 2D
 * containers and their bounds.
 */
export declare class ShadowFilter {
    renderer: WebGLRenderer;
    private _gaussianBlurShader;
    private _mesh;
    private _state;
    constructor(renderer: WebGLRenderer);
    applyGaussianBlur(light: ShadowCastingLight): void;
    applyBlurScale(input: RenderTexture, output: RenderTexture | RenderTarget, scale: Float32Array): void;
}
