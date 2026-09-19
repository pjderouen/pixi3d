import { glTFChannel } from "./gltf-channel";
import { glTFInterpolation } from "./gltf-interpolation";
export declare class glTFWeights extends glTFChannel {
    private _weights;
    constructor(weights: number[], input: ArrayLike<number>, interpolation: glTFInterpolation);
    updateTarget(data: ArrayLike<number>): void;
}
