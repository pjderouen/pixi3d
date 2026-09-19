import { Container3D } from "../container";
/**
 * Represents a joint used for vertex skinning.
 */
export declare class Joint extends Container3D {
    readonly inverseBindMatrix: Float32Array;
    /**
     * Creates a new joint.
     * @param inverseBindMatrix The inverse of the global transform matrix.
     */
    constructor(inverseBindMatrix: Float32Array);
}
