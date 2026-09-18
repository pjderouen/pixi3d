import { MeshGeometry3D } from "./mesh-geometry";
export declare namespace PlaneGeometry {
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
