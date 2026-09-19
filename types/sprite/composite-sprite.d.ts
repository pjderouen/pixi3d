import { RenderTexture, Renderer, Container, DestroyOptions, Sprite } from "pixi.js";
import { CompositeSpriteOptions } from "./composite-sprite-options";
/**
 * Represents a sprite used for compositing a 3D object as a 2D sprite. Can be
 * used for post processing effects and filters.
 */
export declare class CompositeSprite extends Sprite {
    renderer: Renderer;
    private _tickerRender;
    private _prerender?;
    private _renderTexture;
    private _renderTarget;
    /** The render texture. */
    get renderTexture(): RenderTexture;
    /**
     * Creates a new composite sprite using the specified options.
     * @param renderer The renderer to use.
     * @param options The options for the render texture. If both width and height
     * has not been set, it will automatically be resized to the renderer size.
     */
    constructor(renderer: Renderer, options?: CompositeSpriteOptions);
    /**
     * Sets the resolution of the render texture.
     * @param resolution The resolution to set.
     */
    setResolution(resolution: number): void;
    destroy(options?: DestroyOptions): void;
    /**
     * Updates the sprite's texture by rendering the specified object to it.
     * @param object The object to render.
     */
    renderObject(object: Container): void;
    /**
     * Returns a value indicating if the sprite would be seen: it and all its
     * ancestors are visible, it is renderable, and its alpha (with theirs) is
     * above zero.
     */
    private isDisplayed;
}
