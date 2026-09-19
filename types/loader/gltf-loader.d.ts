import type { LoaderParser } from "pixi.js";
import { glTFAsset } from "../gltf/gltf-asset";
/**
 * Load parser for `.gltf` files: `Assets.load("model.gltf")` resolves to a
 * `glTFAsset`. External buffers and images referenced by the file are loaded
 * relative to it (images through the same loader, so they share its cache).
 */
export declare const glTFLoader: LoaderParser<glTFAsset>;
