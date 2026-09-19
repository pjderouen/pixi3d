import { Matrix4x4 } from "./matrix";
import { Point3D } from "./point";
import { Quaternion } from "./quaternion";
/**
 * Handles position, scaling and rotation in 3D.
 *
 * Standalone since the PixiJS v8 port: v8 removed the `Transform` class this
 * used to extend (2D containers now own their matrices directly), and the 3D
 * hierarchy is no longer walked by the renderer. `Container3D.updateTransform3D`
 * drives `updateTransform` for the meshes being drawn.
 */
export declare class Transform3D {
    /** @internal Bumped whenever position, scale or rotation change. */
    _localID: number;
    /** @internal The local id the local matrix was last computed for. */
    _currentLocalID: number;
    /** @internal Bumped whenever the world matrix is recomputed. */
    _worldID: number;
    /**
     * @internal The parent's world id the world matrix was last computed
     * against; -1 means "needs recomputing", -2 means "computed with no parent".
     */
    _parentID: number;
    /** The position in local space. */
    position: Point3D;
    /** The scale in local space. */
    scale: Point3D;
    /** The rotation in local space. */
    rotationQuaternion: Quaternion;
    /** The transformation matrix in world space. */
    worldTransform: Matrix4x4;
    /** The transformation matrix in local space. */
    localTransform: Matrix4x4;
    /** The inverse transformation matrix in world space. */
    inverseWorldTransform: Matrix4x4;
    /** The normal transformation matrix. */
    normalTransform: Matrix4x4;
    protected onChange(): void;
    /**
     * Updates the local transformation matrix.
     */
    updateLocalTransform(): void;
    /**
     * Sets position, rotation and scale from a matrix array.
     * @param matrix The matrix to set.
     */
    setFromMatrix(matrix: Matrix4x4): void;
    /**
     * Updates the world transformation matrix.
     * @param parentTransform The parent transform.
     */
    updateTransform(parentTransform?: Transform3D): void;
    /**
     * Rotates the transform so the forward vector points at specified point.
     * @param point The point to look at.
     * @param up The upward direction.
     */
    lookAt(point: Point3D, up?: Point3D | Float32Array): void;
}
