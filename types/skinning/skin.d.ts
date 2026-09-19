import { Joint } from "./joint";
import { Container3D } from "../container";
/**
 * Represents a skin used for vertex skinning.
 */
export declare class Skin {
    readonly parent: Container3D;
    readonly joints: Joint[];
    private _jointMatrices;
    private _jointNormalMatrices;
    private _transformIds;
    /** The joint normal matrices which has been calculated. */
    jointNormalMatrices: Float32Array<ArrayBuffer>;
    /** The joint matrices which has been calculated. */
    jointMatrices: Float32Array<ArrayBuffer>;
    /**
     * Creates a new skin.
     * @param parent The parent container node for the skin.
     * @param joints The array of joints included in the skin.
     */
    constructor(parent: Container3D, joints: Joint[]);
    /**
     * Calculates the joint matrices.
     */
    calculateJointMatrices(): void;
}
