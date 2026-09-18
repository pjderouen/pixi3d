import type { LoaderParser } from "pixi.js";
import { Cubemap } from "../cubemap/cubemap";
/**
 * Load parser for `.cubemap` files (a JSON list of face image urls, one per
 * mipmap level): `Assets.load("environment.cubemap")` resolves to a
 * `Cubemap`. The face images are loaded through the same loader so they
 * share its cache.
 */
export declare const CubemapLoader: LoaderParser<Cubemap>;
