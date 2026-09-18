import { Buffer } from "pixi.js";
import { MeshGeometryAttribute } from "./mesh-geometry-attribute";
/**
 * Creates the v8 attribute description for a mesh geometry attribute.
 * @param attribute The attribute with the mesh data.
 * @param size The number of components per vertex.
 * @param instance Whether the attribute is per-instance.
 */
export declare function createAttribute(attribute: MeshGeometryAttribute, size: number, instance?: boolean): {
    buffer: Buffer;
    format: any;
    stride: number | undefined;
    instance: boolean;
};
/**
 * Creates the v8 index buffer for a mesh geometry. v8 draws 16- or 32-bit
 * indices only, so 8-bit indices are widened.
 * @param indices The attribute with the index data.
 */
export declare function createIndexBuffer(indices: MeshGeometryAttribute): Buffer;
