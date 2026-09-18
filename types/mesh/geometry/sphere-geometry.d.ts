import { MeshGeometry3D } from "./mesh-geometry";
export interface SphereGeometryOptions {
    /** The radius of the sphere. */
    radius?: number;
    /** The number of segments of the sphere. */
    segments?: number;
    /** The number of rings of the sphere. */
    rings?: number;
}
export declare namespace SphereGeometry {
    function create(options?: SphereGeometryOptions): MeshGeometry3D & {
        normals: {
            buffer: Float32Array<ArrayBuffer>;
        };
        uvs: {
            buffer: Float32Array<ArrayBuffer>;
        }[];
        indices: {
            buffer: Uint16Array<ArrayBuffer>;
        };
        positions: {
            buffer: Float32Array<ArrayBuffer>;
        };
    };
}
