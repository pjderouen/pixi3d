import { PointData, Point, Renderer, DestroyOptions } from "pixi.js";
import { Container3D } from "../container";
import { Ray } from "../math/ray";
import { Point3D } from "../transform/point";
import { TransformId } from "../transform/transform-id";
import { Matrix4x4 } from "../transform/matrix";
/**
 * Camera is a device from which the world is viewed.
 */
export declare class Camera extends Container3D implements TransformId {
    renderer: Renderer;
    private _transformId;
    private _rendererAspect;
    /**
     * The id every derived matrix is cached against. Reading it also makes
     * sure the camera's own transform is current (a camera is usually not
     * part of the stage hierarchy, so nothing else updates it) and that the
     * projection follows the renderer's aspect ratio when no explicit aspect
     * is set.
     */
    get transformId(): number;
    private _projection?;
    private _view?;
    private _viewProjection?;
    private _orthographic;
    private _orthographicSize;
    private _obliqueness;
    /**
     * Used for making the frustum oblique, which means that one side is at a
     * smaller angle to the centre line than the opposite side. Only works with
     * perspective projection.
     */
    get obliqueness(): PointData;
    set obliqueness(value: PointData);
    /** Main camera which is used by default. */
    static main: Camera;
    private _prerender;
    /**
     * Creates a new camera using the specified renderer. By default the camera
     * looks towards negative z and is positioned at z = 5.
     * @param renderer Renderer to use.
     */
    constructor(renderer: Renderer);
    destroy(options?: DestroyOptions): void;
    /**
     * The camera's half-size when in orthographic mode. The visible area from
     * center of the screen to the top.
     */
    get orthographicSize(): number;
    set orthographicSize(value: number);
    /**
     * Camera will render objects uniformly, with no sense of perspective.
     */
    get orthographic(): boolean;
    set orthographic(value: boolean);
    /**
     * Converts screen coordinates to a ray.
     * @param x Screen x coordinate.
     * @param y Screen y coordinate.
     * @param viewSize The size of the view when not rendering to the entire screen.
     */
    screenToRay(x: number, y: number, viewSize?: {
        width: number;
        height: number;
    }): Ray | undefined;
    /**
     * Converts screen coordinates to world coordinates.
     * @param x Screen x coordinate.
     * @param y Screen y coordinate.
     * @param distance Distance from the camera.
     * @param point Point to set.
     * @param viewSize The size of the view when not rendering to the entire screen.
     */
    screenToWorld(x: number, y: number, distance: number, point?: Point3D, viewSize?: {
        width: number;
        height: number;
    }): Point3D | undefined;
    /**
     * Converts world coordinates to screen coordinates.
     * @param x World x coordinate.
     * @param y World y coordinate.
     * @param z World z coordinate.
     * @param point Point to set.
     * @param viewSize The size of the view when not rendering to the entire screen.
     */
    worldToScreen(x: number, y: number, z: number, point?: Point, viewSize?: {
        width: number;
        height: number;
    }): Point;
    private _fieldOfView;
    private _near;
    private _far;
    private _aspect?;
    /**
     * The aspect ratio (width divided by height). If not set, the aspect ratio of
     * the renderer will be used by default.
     */
    get aspect(): number | undefined;
    set aspect(value: number | undefined);
    /** The vertical field of view in degrees, 60 is the default value. */
    get fieldOfView(): number;
    set fieldOfView(value: number);
    /** The near clipping plane distance, 0.1 is the default value. */
    get near(): number;
    set near(value: number);
    /** The far clipping plane distance, 1000 is the default value. */
    get far(): number;
    set far(value: number);
    /** Returns the projection matrix. */
    get projection(): Matrix4x4;
    /** Returns the view matrix. */
    get view(): Matrix4x4;
    /** Returns the view projection matrix. */
    get viewProjection(): Matrix4x4;
}
