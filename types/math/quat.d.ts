export declare class Quat {
    static set(x: number, y: number, z: number, w: number, out?: Float32Array): Float32Array;
    static fromValues(x: number, y: number, z: number, w: number): Float32Array;
    static create(): Float32Array;
    static normalize(a: Float32Array, out?: Float32Array): Float32Array;
    static slerp(a: Float32Array, b: Float32Array, t: number, out?: Float32Array): Float32Array;
    static fromEuler(x: number, y: number, z: number, out?: Float32Array): Float32Array;
    static conjugate(a: Float32Array, out?: Float32Array): Float32Array;
    static rotateX(a: Float32Array, rad: number, out?: Float32Array): Float32Array;
    static rotateY(a: Float32Array, rad: number, out?: Float32Array): Float32Array;
    static rotateZ(a: Float32Array, rad: number, out?: Float32Array): Float32Array;
    static rotationTo(from: Float32Array, to: Float32Array, out?: Float32Array): Float32Array;
}
