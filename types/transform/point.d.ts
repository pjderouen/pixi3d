import { ObservablePoint, Observer, Point, PointData } from "pixi.js";
import { Matrix4x4 } from "./matrix";
import { Quaternion } from "./quaternion";
/**
 * Represents a point in 3D space.
 */
export declare class Point3D extends ObservablePoint implements IPoint3DData {
    private _array;
    /** The callback invoked when the point changes. */
    cb: () => void;
    /** The owner of the callback. */
    scope: any;
    /** Array containing the x, y, z values. */
    get array(): Float32Array;
    set array(value: Float32Array);
    /**
     * Creates a new observable point.
     * @param x The position on the x axis.
     * @param y The position on the y axis.
     * @param z The position on the z axis.
     * @param cb The callback when changed.
     * @param scope The owner of callback.
     */
    constructor(x?: number, y?: number, z?: number, cb?: () => void, scope?: any);
    /**
     * Position on the x axis relative to the local coordinates of the parent.
     */
    get x(): number;
    set x(value: number);
    /**
     * Position on the y axis relative to the local coordinates of the parent.
     */
    get y(): number;
    set y(value: number);
    /**
     * Position on the z axis relative to the local coordinates of the parent.
     */
    get z(): number;
    set z(value: number);
    /**
     * Creates a clone of this point.
     * @param cb Callback when changed.
     * @param scope Owner of callback.
     */
    clone(cb?: () => void, scope?: any): Point3D;
    /**
     * Creates a clone of this point, notifying a PixiJS observer when changed.
     * @param observer The observer to notify.
     */
    clone(observer?: Observer<ObservablePoint>): Point3D;
    copyFrom(p: IPoint3DData): this;
    copyTo<T extends PointData>(p: T): T;
    equals(p: Point3D): boolean;
    /**
     * Sets the point to a new x, y and z position.
     * @param x The position on the x axis.
     * @param y The position on the y axis.
     * @param z The position on the z axis.
     */
    set(x: number, y?: number, z?: number): this;
    /**
     * Sets the point to a new x, y and z position.
     * @param array The array containing x, y and z, expected length is 3.
     */
    setFrom(array: ArrayLike<number>): this;
    /**
     * Normalize the point.
     * @param out The receiving point. If not supplied, a new point will be created.
     */
    normalize(out?: Point3D): Point3D;
    /**
     * Normalize the point into a 2D point, as `ObservablePoint.normalize`
     * does: receives the x and y of the normalized 3D point.
     * @param out The receiving point.
     */
    normalize<T extends PointData = Point>(out?: T): T;
    /**
     * Calculates the length of the point. A method, as on PixiJS v8's
     * `ObservablePoint`; it was a getter up to PixiJS v7.
     */
    magnitude(): number;
    toString(): string;
    /**
     * Calculates the dot product of two points.
     * @param a The first point.
     * @param b The second point.
     */
    static dot(a: Point3D, b: Point3D): number;
    /**
     * Adds two points.
     * @param a The first point.
     * @param b The second point.
     * @param out The receiving point. If not supplied, a new point will be created.
     */
    static add(a: Point3D, b: Point3D, out?: Point3D): Point3D;
    /**
     * Subtracts the second point from the first point.
     * @param a The first point.
     * @param b The second point.
     * @param out The receiving point. If not supplied, a new point will be created.
     */
    static subtract(a: Point3D, b: Point3D, out?: Point3D): Point3D;
    /**
     * Computes the cross product of two points.
     * @param a The first point.
     * @param b The second point.
     * @param out The receiving point. If not supplied, a new point will be created.
     */
    static cross(a: Point3D, b: Point3D, out?: Point3D): Point3D;
    /**
     * Inverts of the components of a point.
     * @param a The point to invert.
     * @param out The receiving point. If not supplied, a new point will be created.
     */
    static inverse(a: Point3D, out?: Point3D): Point3D;
    /**
     * Calculates the euclidian distance between two points.
     * @param a The first point.
     * @param b The second point.
     */
    static distance(a: Point3D, b: Point3D): number;
    /**
     * Calculates the squared euclidian distance between two points.
     * @param a The first point.
     * @param b The second point.
     */
    static squaredDistance(a: Point3D, b: Point3D): number;
    /**
     * Multiplies two points.
     * @param a The first point.
     * @param b The second point.
     * @param out The receiving point. If not supplied, a new point will be created.
     */
    static multiply(a: Point3D, b: Point3D, out?: Point3D): Point3D;
    /**
     * Negates the components of a point.
     * @param a The point to negate.
     * @param out The receiving point. If not supplied, a new point will be created.
     */
    static negate(a: Point3D, out?: Point3D): Point3D;
    /**
     * Transforms a point with a matrix or quaternion.
     * @param a The point to transform.
     * @param m The matrix or quaternion to transform with.
     * @param out The receiving point. If not supplied, a new point will be created.
     */
    static transform(a: Point3D, m: Matrix4x4 | Quaternion, out?: Point3D): Point3D;
    /**
     * Performs a linear interpolation between two points.
     * @param a The first point.
     * @param b The second point.
     * @param t The interpolation amount, in the range [0-1], between the two inputs.
     * @param out The receiving point. If not supplied, a new point will be created.
     */
    static lerp(a: Point3D, b: Point3D, t: number, out?: Point3D): Point3D;
    /**
     * Scales a point by a scalar number.
     * @param a The point to scale.
     * @param b The amount to scale the point by.
     * @param out The receiving point. If not supplied, a new point will be created.
     */
    static scale(a: Point3D, b: number, out?: Point3D): Point3D;
}
export interface IPoint3DData {
    x: number;
    y: number;
    z: number;
}
