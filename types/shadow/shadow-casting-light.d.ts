import { RenderTexture, RenderTarget, WebGLRenderer } from "pixi.js";
import { Light } from "../lighting/light";
import { Camera } from "../camera/camera";
import { ShadowQuality } from "./shadow-quality";
export interface ShadowCastingLightOptions {
    /**
     * The quality (precision) of the shadow. If the quality is not supported by
     * current platform, a lower quality will be selected instead.
     */
    quality?: ShadowQuality;
    /**
     * The size (both width and height) in pixels for the shadow texture.
     * Increasing the size will improve the quality of the shadow.
     */
    shadowTextureSize?: number;
}
/**
 * Contains the required components used for rendering a shadow casted by a light.
 */
export declare class ShadowCastingLight {
    renderer: WebGLRenderer;
    light: Light;
    private _shadowTexture;
    private _filterTexture;
    private _renderTarget;
    private _lightViewProjection;
    /** The softness of the edges for the shadow. */
    softness: number;
    /**
     * The area in units of the shadow when using directional lights. Reducing
     * the area will improve the quality of the shadow.
     */
    shadowArea: number;
    /** The light view projection matrix. */
    get lightViewProjection(): Float32Array<ArrayBuffer>;
    /** The camera to follow when using directional lights. */
    camera?: Camera;
    /**
     * Value indicating if the shadow should follow the specified camera. If the
     * camera is not set, the main camera will be used as default. Only available
     * when using directional lights.
     */
    followCamera: boolean;
    /**
     * The rendered shadow texture.
     */
    get shadowTexture(): RenderTexture;
    /**
     * The rendered filter texture.
     */
    get filterTexture(): RenderTexture;
    /**
     * The render target which draws into the shadow texture with a depth
     * buffer attached. Shadow casters must be rendered through this target,
     * not the texture itself, so they are depth tested against each other.
     */
    get renderTarget(): RenderTarget;
    /**
     * Creates a new shadow casting light used for rendering a shadow texture.
     * @param renderer The renderer to use.
     * @param light The light which is casting the shadow.
     * @param options The options to use when creating the shadow texture.
     */
    constructor(renderer: WebGLRenderer, light: Light, options?: ShadowCastingLightOptions);
    /**
     * Destroys the shadow casting light and it's used resources.
     */
    destroy(): void;
    /**
     * Clears the rendered shadow texture (color and depth).
     */
    clear(): void;
    /**
     * Updates the light view projection matrix.
     */
    updateLightViewProjection(): void;
    /**
     * Returns a value indicating if medium quality (16-bit precision) shadows is
     * supported by current platform.
     * @param renderer The renderer to use.
     */
    static isMediumQualitySupported(renderer: WebGLRenderer): boolean;
    /**
     * Returns a value indicating if high quality (32-bit precision) shadows is
     * supported by current platform.
     * @param renderer The renderer to use.
     */
    static isHighQualitySupported(renderer: WebGLRenderer): boolean;
}
