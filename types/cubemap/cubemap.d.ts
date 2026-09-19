import { Texture } from "pixi.js";
import { CubemapResource } from "./cubemap-resource";
import { Color } from "../color";
import { CubemapFaces } from "./cubemap-faces";
import { CubemapFormat } from "./cubemap-format";
/**
 * Cubemap which supports multiple user specified mipmaps. It is a texture
 * whose source is a cube (`CubemapResource`), so it can be assigned straight
 * to a `samplerCube` uniform.
 */
export declare class Cubemap extends Texture<CubemapResource> {
    /** Returns an array of faces. */
    static get faces(): ["posx", "negx", "posy", "negy", "posz", "negz"];
    /** Returns the number of mipmap levels. */
    get levels(): number;
    /** The format for this cubemap. */
    cubemapFormat: CubemapFormat;
    /**
     * Value indicating if every face of every level has loaded and the cubemap
     * can be used for rendering.
     */
    get valid(): boolean;
    /**
     * Creates a new cubemap from the specified resource.
     * @param source The cube texture source.
     */
    constructor(source: CubemapResource);
    /**
     * Creates a new cubemap from the specified faces. Passing an array creates
     * one mip level per element, largest first.
     * @param faces The faces to create the cubemap from.
     * @param format The format of the cubemap.
     */
    static fromFaces(faces: CubemapFaces | CubemapFaces[], format?: CubemapFormat): Cubemap;
    /**
     * Creates a new cubemap from the specified mip levels, largest first.
     * @param mipmaps The faces for each mip level.
     * @param format The format of the cubemap.
     */
    static fromMipmaps(mipmaps: CubemapFaces[], format?: CubemapFormat): Cubemap;
    /**
     * Creates a new cubemap from the specified colors.
     * @param posx The color for positive x.
     * @param negx The color for negative x.
     * @param posy The color for positive y.
     * @param negy The color for negative y.
     * @param posz The color for positive z.
     * @param negz The color for negative z.
     */
    static fromColors(posx: Color, negx?: Color, posy?: Color, negy?: Color, posz?: Color, negz?: Color): Cubemap;
}
