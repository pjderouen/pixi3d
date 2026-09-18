import { WebGLRenderer } from "pixi.js";
import { RenderPass } from "../pipeline/render-pass";
import { Mesh3D } from "../mesh/mesh";
import { ShadowCastingLight } from "./shadow-casting-light";
/**
 * Pass used for rendering shadows.
 */
export declare class ShadowRenderPass implements RenderPass {
    renderer: WebGLRenderer;
    name: string;
    private _lights;
    private _filter;
    private _shadow;
    /**
     * Creates a new shadow render pass using the specified renderer.
     * @param renderer The renderer to use.
     * @param name The name for the render pass.
     */
    constructor(renderer: WebGLRenderer, name?: string);
    /**
     * Adds a shadow casting light.
     * @param shadowCastingLight The light to add.
     */
    addShadowCastingLight(shadowCastingLight: ShadowCastingLight): void;
    /**
     * Removes a shadow casting light.
     * @param shadowCastingLight The light to remove.
     */
    removeShadowCastingLight(shadowCastingLight: ShadowCastingLight): void;
    clear(): void;
    render(meshes: Mesh3D[]): void;
}
