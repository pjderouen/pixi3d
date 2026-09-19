import type { LoaderParser } from "pixi.js";
import { glTFAsset } from "../gltf/gltf-asset";
/**
 * Load parser for binary glTF (`.glb`) files: `Assets.load("model.glb")`
 * resolves to a `glTFAsset`.
 */
export declare const glTFBinaryLoader: LoaderParser<glTFAsset>;
