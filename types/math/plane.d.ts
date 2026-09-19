import { Point3D } from "../transform/point";
import { Ray } from "./ray";
export declare class Plane {
    distance: number;
    private _normal;
    constructor(normal: Point3D, distance: number);
    static from(position: Point3D, normal: Point3D): Plane;
    get normal(): Point3D;
    rayCast(ray: Ray): number;
}
