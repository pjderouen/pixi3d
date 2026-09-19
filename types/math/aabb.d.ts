import { Point3D } from "../transform/point";
/**
 * Axis-aligned bounding box.
 */
export declare class AABB {
    private _onChanged;
    private _min;
    private _max;
    private _center;
    private _size;
    private _extents;
    /** The minimal point of the bounding box. */
    get min(): Point3D;
    set min(value: Point3D);
    /** The maximal point of the bounding box. */
    get max(): Point3D;
    set max(value: Point3D);
    /** The center of the bounding box. */
    get center(): Point3D;
    /** The size of the bounding box. */
    get size(): Point3D;
    /** The extents of the bounding box. */
    get extents(): Point3D;
    /**
     * Creates a new bounding box from the specified source.
     * @param source The source to create the bounding box from.
     */
    static from(source: {
        min: Float32Array;
        max: Float32Array;
    }): AABB;
    /**
     * Grows the bounding box to include the point.
     * @param point The point to include.
     */
    encapsulate(point: {
        x: number;
        y: number;
        z: number;
    }): void;
}
