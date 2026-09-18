export declare class Vec3 {
    static set(x: number, y: number, z: number, out?: Float32Array): Float32Array;
    static fromValues(x: number, y: number, z: number): Float32Array;
    static create(): Float32Array;
    static add(a: Float32Array, b: Float32Array, out?: Float32Array): Float32Array;
    static transformQuat(a: Float32Array, q: Float32Array, out?: Float32Array): Float32Array;
    static subtract(a: Float32Array, b: Float32Array, out?: Float32Array): Float32Array;
    static scale(a: Float32Array, b: number, out?: Float32Array): Float32Array;
    static dot(a: Float32Array, b: Float32Array): number;
    static normalize(a: Float32Array, out?: Float32Array): Float32Array;
    static cross(a: Float32Array, b: Float32Array, out?: Float32Array): Float32Array;
    static transformMat4(a: Float32Array, m: Float32Array, out?: Float32Array): Float32Array;
    static copy(a: Float32Array, out?: Float32Array): Float32Array;
    static magnitude(a: Float32Array): number;
    static squaredMagnitude(a: Float32Array): number;
    static inverse(a: Float32Array, out?: Float32Array): Float32Array;
    static negate(a: Float32Array, out?: Float32Array): Float32Array;
    static multiply(a: Float32Array, b: Float32Array, out?: Float32Array): Float32Array;
    static distance(a: Float32Array, b: Float32Array): number;
    static squaredDistance(a: Float32Array, b: Float32Array): number;
    static lerp(a: Float32Array, b: Float32Array, t: number, out?: Float32Array): Float32Array;
}
