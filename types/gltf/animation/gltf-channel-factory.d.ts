import { Container3D } from "../../container";
import { glTFRotation } from "./gltf-rotation";
import { glTFScale } from "./gltf-scale";
import { glTFTranslation } from "./gltf-translation";
import { glTFWeights } from "./gltf-weights";
export declare abstract class glTFChannelFactory {
    static create(input: ArrayLike<number>, output: ArrayLike<number>, interpolation: string, path: string, target: Container3D): glTFRotation | glTFScale | glTFTranslation | glTFWeights | undefined;
}
