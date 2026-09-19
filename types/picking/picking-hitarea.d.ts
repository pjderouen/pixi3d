import type { IHitArea } from "pixi.js";
import { Mesh3D } from "../mesh/mesh";
import { Model } from "../model";
import { Camera } from "../camera/camera";
/**
 * Hit area which uses the shape of an object to determine interaction.
 * Assign it to the `hitArea` of an object with `eventMode` set to "static"
 * (or "dynamic") and listen for the usual pointer events on that object.
 */
export declare class PickingHitArea implements IHitArea {
    object: Mesh3D | Model;
    camera?: Camera | undefined;
    /** The id which maps to the object. */
    id: Uint8Array<ArrayBuffer>;
    /**
     * Creates a new hitarea using the specified object.
     * @param object The model or mesh to use as the shape for hit testing.
     * @param camera The camera to use when rendering the object picking shape.
     * If not set, the main camera will be used as default.
     */
    constructor(object: Mesh3D | Model, camera?: Camera | undefined);
    contains(x: number, y: number): boolean;
}
