import { Point3D } from "../transform/point";
export declare class Ray {
    private _direction;
    private _origin;
    constructor(origin: Point3D, direction: Point3D);
    get origin(): Point3D;
    get direction(): Point3D;
    getPoint(distance: number, point?: Point3D): Point3D;
}
