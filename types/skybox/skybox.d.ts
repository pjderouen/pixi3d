import { Container3D } from "../container";
import { Cubemap } from "../cubemap/cubemap";
import { Camera } from "../camera/camera";
import { CubemapFaces } from "../cubemap/cubemap-faces";
/**
 * A skybox is a method of creating backgrounds in a 3D scene. It consists of
 * a cubemap texture which has six sides. Note that the skybox should be rendered
 * before all other objects in the scene.
 */
export declare class Skybox extends Container3D {
    private _mesh;
    /**
     * Creates a new skybox using the specified cubemap.
     * @param cubemap Cubemap to use for rendering.
     */
    constructor(cubemap: Cubemap);
    /**
     * Camera used when rendering. If this value is not set, the main camera will
     * be used by default.
     */
    get camera(): Camera | undefined;
    set camera(value: Camera | undefined);
    /**
     * The cubemap exposure used when rendering.
     */
    get exposure(): number;
    set exposure(value: number);
    /**
     * The cubemap texture used when rendering.
     */
    get cubemap(): Cubemap;
    set cubemap(value: Cubemap);
    /**
     * Creates a new skybox from the specified source.
     * @param source The source to create the skybox from.
     */
    static from(source: CubemapFaces): Skybox;
}
