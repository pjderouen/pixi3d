import { MeshGeometry3D } from "./mesh-geometry";
export interface CircleGeometryOptions {
    /** The radius of the top of the circle. Default is 1. */
    radius?: number;
    /** The number of segmented faces around the circumference of the cylinder. Default is 32. */
    segments?: number;
    /** Start angle for first segment, default = 0 (three o'clock position). */
    thetaStart?: number;
    /** The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete circle. */
    thetaLength?: number;
}
export declare class CircleGeometry {
    static create(options?: CircleGeometryOptions): MeshGeometry3D & {
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
