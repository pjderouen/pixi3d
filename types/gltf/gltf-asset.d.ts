import { Texture } from "pixi.js";
import type { Loader } from "pixi.js";
import type { glTFResourceLoader } from "./gltf-resource-loader";
/**
 * glTF assets are JSON files plus supporting external data.
 */
export declare class glTFAsset {
    readonly descriptor: any;
    readonly buffers: ArrayBuffer[];
    readonly images: Texture[];
    /**
     * The textures used by this asset.
     */
    readonly textures: Texture[];
    /**
     * Creates a new glTF asset using the specified JSON descriptor.
     * @param descriptor The JSON descriptor to create the asset from.
     * @param buffers The buffers used by this asset.
     * @param images The images used by this asset.
     */
    constructor(descriptor: any, buffers?: ArrayBuffer[], images?: Texture[]);
    /**
     * Loads a new glTF asset (including resources) using the specified JSON
     * descriptor.
     * @param descriptor The JSON descriptor to create the asset from.
     * @param loader The resource loader to use for external resources. The
     * loader can be empty when all resources in the descriptor is embedded.
     * @param cb Callback when all resources have been loaded.
     */
    static load(descriptor: any, loader?: glTFResourceLoader, cb?: (asset: glTFAsset) => void): Promise<glTFAsset>;
    /**
     * Returns a value indicating if the specified data buffer is a valid glTF.
     * @param buffer The buffer data to validate.
     */
    static isValidBuffer(buffer: ArrayBuffer): boolean;
    /**
     * Returns a value indicating if the specified uri is embedded.
     * @param uri The uri to check.
     */
    static isEmbeddedResource(uri: string): boolean | "";
    /**
     * Creates a new glTF asset from binary (glb) buffer data.
     * @param data The binary buffer data to read from.
     * @param cb The function which gets called when the asset has been
     * created.
     * @param loader The resource loader to use for external resources, which
     * a binary glTF may still reference by uri.
     */
    static fromBuffer(data: ArrayBuffer, cb?: (gltf: glTFAsset) => void, loader?: glTFResourceLoader): Promise<glTFAsset>;
    /**
     * Loads a glTF asset (`.gltf` or `.glb`) from the specified url. External
     * resources are loaded relative to the url, images through `Assets`.
     * @param url The url to load.
     * @param options Options for the fetch request.
     */
    static fromURL(url: string, options?: RequestInit | undefined): Promise<glTFAsset>;
}
/**
 * Loads external glTF resources relative to the url of the glTF file. Images
 * go through the `Assets` loader (so they are cached and decoded the same
 * way as any other texture), buffers are fetched directly.
 */
export declare class glTFUrlResourceLoader implements glTFResourceLoader {
    private parentUrl;
    private loader?;
    /**
     * Creates a new resource loader.
     * @param parentUrl The url of the glTF file which references the resources.
     * @param loader The loader to load images with. When loading from inside
     * an `Assets` load parser this should be the loader passed to the parser;
     * defaults to `Assets`.
     */
    constructor(parentUrl: string, loader?: Loader | undefined);
    /**
     * Resolves a uri from the descriptor against the parent url.
     * @param uri The uri to resolve.
     */
    resolve(uri: string): string;
    loadBuffer(uri: string): Promise<ArrayBuffer>;
    loadTexture(uri: string): Promise<Texture<import("pixi.js").TextureSource<any>>>;
}
