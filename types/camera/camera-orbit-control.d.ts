import { ObservablePoint } from "pixi.js";
import { Camera } from "./camera";
/**
 * Allows the user to control the camera by orbiting the target.
 */
export declare class CameraOrbitControl {
    protected _autoUpdate: boolean;
    /**
     * Whether to auto update the camera on prerender.
     * Default is true.
     */
    get autoUpdate(): boolean;
    set autoUpdate(value: boolean);
    protected _allowControl: boolean;
    /**
     * Allows the camera to be controlled by user.
     */
    get allowControl(): boolean;
    set allowControl(value: boolean);
    protected _camera: Camera;
    /**
     * The camera being controlled.
     */
    get camera(): Camera;
    set camera(value: Camera);
    protected _target: {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Target position (x, y, z) to orbit.
     */
    get target(): {
        x: number;
        y: number;
        z: number;
    };
    set target(value: {
        x: number;
        y: number;
        z: number;
    });
    protected _angles: ObservablePoint;
    /**
     * Orientation euler angles (x-axis and y-axis).
     * The angle for the x-axis will be clamped between -85 and 85 degrees.
     */
    get angles(): ObservablePoint;
    protected _distance: number;
    /**
     * Distance between camera and the target.
     * Default value is 5.
     */
    get distance(): number;
    set distance(value: number);
    protected _enableDamping: boolean;
    /**
     * Value indicating if damping (inertia) is enabled, which can be used to give a sense of weight to the controls.
     * Default is false.
     */
    get enableDamping(): boolean;
    set enableDamping(value: boolean);
    protected _dampingFactor: number;
    /**
     * The damping inertia used if enableDamping is true.
     * Default is 0.1.
     */
    get dampingFactor(): number;
    set dampingFactor(value: number);
    protected _element: HTMLElement;
    protected _grabbed: boolean;
    protected _previousPinchDistance: number;
    protected _previousClientX: number;
    protected _previousClientY: number;
    protected _dampingAngles: {
        x: number;
        y: number;
    };
    protected _dampingDistance: number;
    /**
     * The object registered with the renderer's "prerender" runner, which calls
     * its `prerender` method before every frame.
     */
    protected _prerenderHook?: {
        prerender: () => void;
    };
    /**
     * Creates a new camera orbit control.
     * @param element The element for listening to user events.
     * @param camera The camera to control. If not set, the main camera will be used
     * by default.
     */
    constructor(element: HTMLElement, camera?: Camera);
    destroy(): void;
    protected onPointerDown: (clientX: number, clientY: number) => void;
    protected onPointerUp: () => void;
    protected onPointerMove: (clientX: number, clientY: number) => void;
    protected onPreRender: () => void;
    protected onMouseDown: (e: MouseEvent) => void;
    protected onMouseMove: (e: MouseEvent) => void;
    protected onMouseUp: (_e: MouseEvent) => void;
    protected onWheel: (e: WheelEvent) => void;
    protected onTouchStart: (e: TouchEvent) => void;
    protected onPinch: (e: TouchEvent) => void;
    protected onTouchMove: (e: TouchEvent) => void;
    protected onTouchEnd: (e: TouchEvent) => void;
    protected bind(): void;
    protected unbind(): void;
    /**
     * Updates the position and rotation of the camera.
     */
    updateCamera(): void;
}
