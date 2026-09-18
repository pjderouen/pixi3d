import { Color } from "../color";
import { RenderTexture, WebGLRenderer } from "pixi.js";
import { RenderPass } from "./render-pass";
import { Mesh3D } from "../mesh/mesh";
/**
 * Pass used for rendering materials.
 */
export declare class MaterialRenderPass implements RenderPass {
    renderer: WebGLRenderer;
    name: string;
    private _renderTexture?;
    /** The color (r,g,b,a) used for clearing the render texture. If this value is empty, the render texture will not be cleared. */
    clearColor?: Color | undefined;
    /** The texture used when rendering to a texture. */
    get renderTexture(): RenderTexture | undefined;
    set renderTexture(value: RenderTexture | undefined);
    /**
     * Creates a new material render pass.
     * @param renderer The renderer to use.
     * @param name The name of the render pass.
     */
    constructor(renderer: WebGLRenderer, name: string);
    clear(): void;
    render(meshes: Mesh3D[]): void;
}
