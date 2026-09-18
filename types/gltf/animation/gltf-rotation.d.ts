import { glTFChannel } from "./gltf-channel";
import { glTFInterpolation } from "./gltf-interpolation";
import { Transform3D } from "../../transform/transform";
export declare class glTFRotation extends glTFChannel {
    private _transform;
    constructor(transform: Transform3D, input: ArrayLike<number>, interpolation: glTFInterpolation);
    updateTarget(data: ArrayLike<number>): void;
}
