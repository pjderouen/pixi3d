import { Renderer } from "pixi.js";
export declare namespace Capabilities {
    function getMaxVertexUniformVectors(renderer: Renderer): number;
    function isFloatingPointTextureSupported(renderer: Renderer): boolean;
    function isHalfFloatFramebufferSupported(renderer: Renderer): boolean;
    function isFloatFramebufferSupported(renderer: Renderer): boolean;
    function supportsFloatLinear(renderer: Renderer): boolean;
    function isShaderTextureLodSupported(renderer: Renderer): boolean;
    function isInstancingSupported(renderer: Renderer): boolean;
}
