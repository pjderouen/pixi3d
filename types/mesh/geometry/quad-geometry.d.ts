import { MeshGeometry3D } from "./mesh-geometry";
export declare namespace QuadGeometry {
    function create(): MeshGeometry3D & {
        positions: {
            buffer: Float32Array<ArrayBuffer>;
        };
        indices: {
            buffer: Uint8Array<ArrayBuffer>;
        };
        normals: {
            buffer: Float32Array<ArrayBuffer>;
        };
        uvs: {
            buffer: Float32Array<ArrayBuffer>;
        }[];
    };
}
