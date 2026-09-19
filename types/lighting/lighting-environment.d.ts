import { Renderer } from "pixi.js";
import { ImageBasedLighting } from "./image-based-lighting";
import { Light } from "./light";
import { Fog } from "./fog";
/**
 * A lighting environment represents the different lighting conditions for a
 * specific object or an entire scene.
 */
export declare class LightingEnvironment {
    renderer: Renderer;
    /** The image-based lighting object. */
    imageBasedLighting?: ImageBasedLighting;
    /** The lights affecting this lighting environment. */
    lights: Light[];
    fog?: Fog;
    /** The main lighting environment which is used by default. */
    static main: LightingEnvironment;
    private _prerender;
    /**
     * Creates a new lighting environment using the specified renderer.
     * @param renderer The renderer to use.
     * @param imageBasedLighting The image based lighting to use.
     */
    constructor(renderer: Renderer, imageBasedLighting?: ImageBasedLighting);
    /**
     * Makes sure every light's transform is current before it is read into
     * uniforms; a light that isn't part of the stage hierarchy is never
     * updated by anything else.
     */
    updateLightTransforms(): void;
    destroy(): void;
    /** Value indicating if this object is valid to be used for rendering. */
    get valid(): boolean;
}
