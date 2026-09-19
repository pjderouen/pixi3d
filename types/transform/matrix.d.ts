import { Matrix } from "pixi.js";
import { Point3D } from "./point";
import { Quaternion } from "./quaternion";
import { TransformId } from "./transform-id";
/**
 * Represents a 4x4 matrix.
 */
export declare class Matrix4x4 extends Matrix implements TransformId {
    private _transformId;
    private _position?;
    private _scaling?;
    private _rotation?;
    private _up?;
    private _down?;
    private _forward?;
    private _left?;
    private _right?;
    private _backward?;
    get transformId(): number;
    /** The array containing the matrix data. */
    array: Float32Array;
    /**
     * Creates a new transform matrix using the specified matrix array.
     * @param array The matrix array, expected length is 16. If empty, an identity
     * matrix is used by default.
     */
    constructor(array?: ArrayLike<number>);
    toArray(transpose: boolean, out?: Float32Array): Float32Array<ArrayBufferLike>;
    /** Returns the position component of the matrix. */
    get position(): Point3D;
    /** Returns the scaling component of the matrix. */
    get scaling(): Point3D;
    /** Returns the normalized rotation quaternion of the matrix. */
    get rotation(): Quaternion;
    /** Returns the normalized up vector of the matrix. */
    get up(): Point3D;
    /** Returns the normalized down vector of the matrix. */
    get down(): Point3D;
    /** Returns the normalized left vector of the matrix. */
    get right(): Point3D;
    /** Returns the normalized right vector of the matrix. */
    get left(): Point3D;
    /** Returns the normalized forward vector of the matrix. */
    get forward(): Point3D;
    /** Returns the normalized backward vector of the matrix. */
    get backward(): Point3D;
    copyFrom(matrix: Matrix4x4): this;
    /**
     * Sets the matrix to the contents of the specified array.
     * @param array The array.
     */
    setFrom(array: ArrayLike<number>): this;
    /**
     * Sets the rotation, position and scale components.
     * @param rotation The rotation to set.
     * @param position The position to set.
     * @param scaling The scale to set.
     */
    setFromRotationPositionScale(rotation: Quaternion, position: Point3D, scaling: Point3D): void;
    /**
     * Multiplies this matrix with another matrix.
     * @param matrix The matrix to multiply with.
     */
    multiply(matrix: Matrix4x4): void;
    /**
     * Translate a matrix by the given vector.
     * @param mat The matrix to translate.
     * @param v The vector to translate by.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static translate(mat: Matrix4x4, v: Point3D, out?: Matrix4x4): Matrix4x4;
    /**
     * Calculates a matrix from the given quaternion.
     * @param q The quaternion to create matrix from.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static fromQuaternion(q: Quaternion, out?: Matrix4x4): Matrix4x4;
    /**
     * Creates a matrix from a quaternion rotation, point translation and point scale.
     * @param q The rotation quaternion.
     * @param v The translation point.
     * @param s The scale point.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static fromRotationTranslationScale(q: Quaternion, v: Point3D, s: Point3D, out?: Matrix4x4): Matrix4x4;
    /**
     * Creates a matrix from a given angle around a given axis.
     * @param rad The angle in radians to rotate the matrix by.
     * @param axis The axis to rotate around.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static fromRotation(rad: number, axis: Point3D, out?: Matrix4x4): Matrix4x4;
    /**
     * Creates a matrix from a scaling point.
     * @param v The scaling point.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static fromScaling(v: Point3D, out?: Matrix4x4): Matrix4x4;
    /**
     * Creates a matrix from a scaling point.
     * @param v The translation point.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static fromTranslation(v: Point3D, out?: Matrix4x4): Matrix4x4;
    /**
     * Generates a look-at matrix with the given eye position, focal point, and up axis. If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
     * @param eye The position of the viewer.
     * @param center The point the viewer is looking at.
     * @param up The vector pointing up.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static lookAt(eye: Point3D, center: Point3D, up: Point3D, out?: Matrix4x4): Matrix4x4;
    /**
     * Set a matrix to the identity matrix.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static identity(out?: Matrix4x4): Matrix4x4;
    /**
     *
     * @param fovy The vertical field of view in radians.
     * @param aspect The aspect ratio, typically viewport width/height.
     * @param near The near bound of the frustum.
     * @param far The far bound of the frustum.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     * @returns
     */
    static perspective(fovy: number, aspect: number, near: number, far: number, out?: Matrix4x4): Matrix4x4;
    /**
     *
     * @param left The left bound of the frustum.
     * @param right The right bound of the frustum.
     * @param bottom The bottom bound of the frustum.
     * @param top The top bound of the frustum.
     * @param near The near bound of the frustum.
     * @param far The far bound of the frustum.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number, out?: Matrix4x4): Matrix4x4;
    /**
     * Inverts a matrix.
     * @param a The source matrix to invert.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static invert(a: Matrix4x4, out?: Matrix4x4): Matrix4x4;
    /**
     * Transpose the values of a matrix
     * @param a The source matrix to transpose.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static transpose(a: Matrix4x4, out?: Matrix4x4): Matrix4x4;
    /**
     * Generates a matrix that makes something look at something else.
     * @param eye The position of the viewer.
     * @param target The point the viewer is looking at.
     * @param up The vector pointing up.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static targetTo(eye: Point3D, target: Point3D, up: Point3D, out?: Matrix4x4): Matrix4x4;
    /**
     * Rotates a matrix by the given angle around the x-axis.
     * @param a The matrix to rotate.
     * @param rad The angle in radians to rotate the matrix by.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static rotateX(a: Matrix4x4, rad: number, out?: Matrix4x4): Matrix4x4;
    /**
     * Rotates a matrix by the given angle around the y-axis.
     * @param a The matrix to rotate.
     * @param rad The angle in radians to rotate the matrix by.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static rotateY(a: Matrix4x4, rad: number, out?: Matrix4x4): Matrix4x4;
    /**
     * Rotates a matrix by the given angle around the z-axis.
     * @param a The matrix to rotate.
     * @param rad The angle in radians to rotate the matrix by.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static rotateZ(a: Matrix4x4, rad: number, out?: Matrix4x4): Matrix4x4;
    /**
     * Rotates a matrix by the given angle around the given axis.
     * @param a The matrix to rotate.
     * @param rad The angle in radians to rotate the matrix by.
     * @param axis The axis to rotate around.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static rotate(a: Matrix4x4, rad: number, axis: Point3D, out?: Matrix4x4): Matrix4x4;
    /**
     * Scales the matrix by the dimensions in the given point.
     * @param a The matrix to scale.
     * @param v The point vector to scale the matrix by.
     * @param out The receiving matrix. If not supplied, a new matrix will be created.
     */
    static scale(a: Matrix4x4, v: Point3D, out?: Matrix4x4): Matrix4x4;
}
