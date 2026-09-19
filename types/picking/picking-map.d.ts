import { PickingHitArea } from "./picking-hitarea";
import { WebGLRenderer } from "pixi.js";
export declare class PickingMap {
    private _renderer;
    private _pixels;
    private _output;
    private _target;
    private _shader;
    private _state;
    private _update;
    constructor(_renderer: WebGLRenderer, size: number);
    destroy(): void;
    resizeToAspect(): void;
    containsId(x: number, y: number, id: Uint8Array): boolean;
    update(hitAreas: PickingHitArea[]): void;
    private _matrix;
    renderHitArea(hitArea: PickingHitArea): void;
}
