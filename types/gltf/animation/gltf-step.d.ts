import { glTFInterpolation } from "./gltf-interpolation";
export declare class glTFStep implements glTFInterpolation {
    private _output;
    private _stride;
    private _data;
    private _denormalize;
    constructor(_output: ArrayLike<number>, _stride: number);
    interpolate(frame: number): Float32Array<ArrayBufferLike>;
}
