import { DestroyOptions } from "pixi.js";
import { Container3D } from "../container";
import { Mesh3D } from "./mesh";
export declare class InstancedMesh3D extends Container3D {
    readonly mesh: Mesh3D;
    readonly material: unknown;
    constructor(mesh: Mesh3D, material: unknown);
    destroy(options: boolean | DestroyOptions | undefined): void;
}
