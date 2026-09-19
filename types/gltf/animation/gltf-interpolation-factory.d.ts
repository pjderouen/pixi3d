import { glTFLinear } from "./gltf-linear";
import { glTFCubicSpline } from "./gltf-cubic-spline";
import { glTFStep } from "./gltf-step";
export declare abstract class glTFInterpolationFactory {
    static create(type: string, input: ArrayLike<number>, output: ArrayLike<number>, stride: number): glTFLinear | glTFCubicSpline | glTFStep;
}
