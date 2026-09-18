import { Texture } from "pixi.js";
import { Cubemap } from "../cubemap/cubemap";
/**
 * Collection of components used for image-based lighting (IBL), a
 * rendering technique which involves capturing an omnidirectional representation
 * of real-world light information as an image.
 */
export declare class ImageBasedLighting {
    private _diffuse;
    private _specular;
    private static _defaultLookupBrdf?;
    /**
     * The default BRDF integration map lookup texture. Its image starts
     * decoding as soon as the library is loaded (see below), so it is ready by
     * the time the first scene is rendered.
     */
    static get defaultLookupBrdf(): Texture;
    static set defaultLookupBrdf(value: Texture);
    /** Cube texture used for the diffuse component. */
    get diffuse(): Cubemap;
    /** Cube mipmap texture used for the specular component. */
    get specular(): Cubemap;
    /** BRDF integration map lookup texture. */
    lookupBrdf?: Texture;
    /**
     * Creates a new image-based lighting object.
     * @param diffuse Cubemap used for the diffuse component.
     * @param specular Cubemap used for the specular component.
     */
    constructor(diffuse: Cubemap, specular: Cubemap);
    /**
     * Value indicating if this object is valid to be used for rendering.
     */
    get valid(): boolean;
}
