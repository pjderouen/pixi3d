import { glTFInterpolation } from "./gltf-interpolation";
export declare class glTFCubicSpline implements glTFInterpolation {
    private _input;
    private _output;
    private _stride;
    private _data;
    private _denormalize;
    constructor(_input: ArrayLike<number>, _output: ArrayLike<number>, _stride: number);
    interpolate(frame: number, position: number): Float32Array<ArrayBufferLike>;
    static calculate(t: number, p0: number, p1: number, m0: number, m1: number): number;
}
