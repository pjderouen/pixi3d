import { glTFInterpolation } from "./gltf-interpolation";
export declare class glTFSphericalLinear implements glTFInterpolation {
    private _output;
    private _data;
    constructor(_output: ArrayLike<number>);
    interpolate(frame: number, position: number): Float32Array<ArrayBufferLike>;
}
