import { Container } from "pixi.js";
import type { UpdateTransformOptions } from "pixi.js";
import { Quaternion } from "./transform/quaternion";
import { Transform3D } from "./transform/transform";
import { IPoint3DData, Point3D } from "./transform/point";
import type { Matrix4x4 } from "./transform/matrix";
/**
 * A container represents a collection of 3D objects.
 *
 * In PixiJS v8 the renderer no longer walks a `transform` object per
 * container, so the 3D hierarchy keeps its own `Transform3D` and updates it
 * on demand through `updateTransform3D` (the render pipeline calls it for
 * every mesh it draws; cameras and lights call it themselves).
 */
export declare class Container3D extends Container {
    /** The 3D transform (position, scale, rotation and the derived matrices). */
    transform: Transform3D;
    /**
     * The 3D transformation matrix in local space. Its 2D fields (`a` to `ty`)
     * hold PixiJS' 2D transform of the container, which is always the identity.
     */
    localTransform: Matrix4x4;
    set position(value: IPoint3DData);
    /** The position of the object relative to the local coordinates of the parent. */
    get position(): Point3D;
    set scale(value: IPoint3DData);
    /** The scale of the object. */
    get scale(): Point3D;
    set rotationQuaternion(value: Quaternion);
    /** The quaternion rotation of the object. */
    get rotationQuaternion(): Quaternion;
    /** The position of the object on the x axis relative to the local
     * coordinates of the parent. */
    get x(): number;
    set x(value: number);
    /** The position of the object on the y axis relative to the local
     * coordinates of the parent. */
    get y(): number;
    set y(value: number);
    /** The position of the object on the z axis relative to the local
     * coordinates of the parent. */
    get z(): number;
    set z(value: number);
    /**
     * The 3D transformation matrix in world space. It is brought up to date
     * with this object's and its ancestors' transforms when read: PixiJS v8
     * does not update 3D transforms while rendering, as v7 did for every
     * object in the scene.
     */
    get worldTransform(): Matrix4x4;
    /**
     * Updates the 3D world transform of this object, updating its 3D ancestors
     * first. Cheap when nothing changed (ids are compared, no matrix math).
     */
    updateTransform3D(): void;
    /**
     * Updates the 3D world transform of this object, its 3D ancestors and its
     * visible descendants, as `updateTransform()` did up to PixiJS v7.
     *
     * With options, sets the object's properties as PixiJS v8's
     * `Container.updateTransform` does, keeping the z of the 3D position and
     * scale.
     * @param opts The properties to set.
     */
    updateTransform(opts?: Partial<UpdateTransformOptions>): this;
}
