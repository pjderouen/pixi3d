import { glTFInterpolation } from "./gltf-interpolation";
export declare class glTFLinear implements glTFInterpolation {
    private _output;
    private _stride;
    private _data;
    private _denormalize;
    constructor(_output: ArrayLike<number>, _stride: number);
    interpolate(frame: number, position: number): Float32Array<ArrayBufferLike>;
}
