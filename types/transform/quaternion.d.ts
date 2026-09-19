import { ObservablePoint, Observer, Point, PointData } from "pixi.js";
/**
 * Represents a rotation quaternion in 3D space.
 */
export declare class Quaternion extends ObservablePoint {
    private _array;
    /** The callback invoked when the quaternion changes. */
    cb: () => void;
    /** The owner of the callback. */
    scope: any;
    /** Array containing the x, y, z, w values. */
    get array(): Float32Array;
    set array(value: Float32Array);
    /**
     * Creates a new observable quaternion.
     * @param x The x component.
     * @param y The y component.
     * @param z The z component.
     * @param w The w component.
     * @param cb The callback when changed.
     * @param scope The owner of callback.
     */
    constructor(x?: number, y?: number, z?: number, w?: number, cb?: () => void, scope?: any);
    /** The x component of the quaternion. */
    get x(): number;
    set x(value: number);
    /** The y component of the quaternion. */
    get y(): number;
    set y(value: number);
    /** The z component of the quaternion. */
    get z(): number;
    set z(value: number);
    /** The w component of the quaternion. */
    get w(): number;
    set w(value: number);
    /**
     * Sets the euler angles in degrees.
     * @param x The x angle.
     * @param y The y angle.
     * @param z The z angle.
     */
    setEulerAngles(x: number, y: number, z: number): void;
    /**
     * Creates a clone of this quaternion.
     * @param cb Callback when changed.
     * @param scope Owner of callback.
     */
    clone(cb?: () => void, scope?: any): Quaternion;
    /**
     * Creates a clone of this quaternion, notifying a PixiJS observer when
     * changed.
     * @param observer The observer to notify.
     */
    clone(observer?: Observer<ObservablePoint>): Quaternion;
    /**
     * Copies x, y, z, and w from the given quaternion.
     * @param p The quaternion to copy from.
     */
    copyFrom(p: Quaternion): this;
    /**
     * Copies x, y, z and w into the given quaternion.
     * @param p The quaternion to copy to.
     */
    copyTo<T extends PointData>(p: T): T;
    /**
     * Returns true if the given quaternion is equal to this quaternion.
     * @param p The quaternion to check.
     */
    equals(p: Quaternion): boolean;
    /**
     * Sets the quaternion to new x, y, z and w components.
     * @param x X component to set.
     * @param y Y component to set.
     * @param z Z component to set.
     * @param w W component to set.
     */
    set(x: number, y?: number, z?: number, w?: number): this;
    /**
     * Sets the quaternion to a new x, y, z and w components.
     * @param array The array containing x, y, z and w, expected length is 4.
     */
    setFrom(array: ArrayLike<number>): this;
    /**
     * Normalize the quaternion.
     * @param out The receiving quaternion. If not supplied, a new quaternion will be created.
     */
    normalize(out?: Quaternion): Quaternion;
    /**
     * Normalize the quaternion into a 2D point, as `ObservablePoint.normalize`
     * does: receives the x and y of the normalized quaternion.
     * @param out The receiving point.
     */
    normalize<T extends PointData = Point>(out?: T): T;
    toString(): string;
    /**
     * Performs a spherical linear interpolation between two quaternions.
     * @param a The first quaternion.
     * @param b The second quaternion.
     * @param t The interpolation amount, in the range [0-1], between the two inputs.
     * @param out The receiving quaternion. If not supplied, a new quaternion
     * will be created.
     */
    static slerp(a: Quaternion, b: Quaternion, t: number, out?: Quaternion): Quaternion;
    /**
     * Creates a quaternion from the given euler angle x, y, z.
     * @param x X axis to rotate around in degrees.
     * @param y Y axis to rotate around in degrees.
     * @param z Z axis to rotate around in degrees.
     * @param out The receiving quaternion. If not supplied, a new quaternion
     * will be created.
     */
    static fromEuler(x: number, y: number, z: number, out?: Quaternion): Quaternion;
    /**
     * Calculates the conjugate of a quaternion if the quaternion is normalized.
     * @param a The quaternion to calculate conjugate of.
     * @param out The receiving quaternion. If not supplied, a new quaternion
     * will be created.
     */
    static conjugate(a: Quaternion, out?: Quaternion): Quaternion;
    /**
     * Rotates a quaternion by the given angle about the X axis.
     * @param a The quaternion to rotate.
     * @param rad The angle (in radians) to rotate.
     * @param out The receiving quaternion. If not supplied, a new quaternion
     * will be created.
     */
    static rotateX(a: Quaternion, rad: number, out?: Quaternion): Quaternion;
    /**
     * Rotates a quaternion by the given angle about the Y axis.
     * @param a The quaternion to rotate.
     * @param rad The angle (in radians) to rotate.
     * @param out The receiving quaternion. If not supplied, a new quaternion
     * will be created.
     */
    static rotateY(a: Quaternion, rad: number, out?: Quaternion): Quaternion;
    /**
     * Rotates a quaternion by the given angle about the Z axis.
     * @param a The quaternion to rotate.
     * @param rad The angle (in radians) to rotate.
     * @param out The receiving quaternion. If not supplied, a new quaternion
     * will be created.
     */
    static rotateZ(a: Quaternion, rad: number, out?: Quaternion): Quaternion;
}
