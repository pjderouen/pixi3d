import { MeshGeometry3D } from "./mesh-geometry";
export interface CylinderGeometryOptions {
    /** The radius of the top of the cylinder. Default is 1. */
    radiusTop?: number;
    /** The radius of the bottom of the cylinder. Default is 1. */
    radiusBottom?: number;
    /** The height of the cylinder. Default is 1. */
    height?: number;
    /** The number of segmented faces around the circumference of the cylinder. Default is 32. */
    radialSegments?: number;
    /** The number of rows of faces along the height of the cylinder. Default is 1. */
    heightSegments?: number;
    /** A boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped. */
    openEnded?: boolean;
    /** Start angle for first segment, default = 0 (three o'clock position). */
    thetaStart?: number;
    /** The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cylinder. */
    thetaLength?: number;
}
export declare class CylinderGeometry {
    static create(options?: CylinderGeometryOptions): MeshGeometry3D & {
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
