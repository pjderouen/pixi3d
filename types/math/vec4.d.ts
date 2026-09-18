export declare class Vec4 {
    static set(x: number, y: number, z: number, w: number, out?: Float32Array): Float32Array;
    static transformMat4(a: Float32Array, m: Float32Array, out?: Float32Array): Float32Array;
    static fromValues(x: number, y: number, z: number, w: number): Float32Array;
}
