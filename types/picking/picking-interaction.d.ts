import { WebGLRenderer } from "pixi.js";
import { PickingHitArea } from "./picking-hitarea";
/**
 * Manages the picking hit areas by keeping track on which hit areas needs to
 * be checked for interaction. Renders the hit area meshes to a texture which
 * is then used to map a mesh to a x/y coordinate. The picking manager is
 * registered as a renderer system and refreshes the map after each frame.
 */
export declare class PickingInteraction {
    renderer: WebGLRenderer;
    private _map?;
    private _hitAreas;
    private _meshesSeen;
    /**
     * Creates a new picking manager using the specified renderer.
     * @param renderer The renderer to use.
     */
    constructor(renderer: WebGLRenderer);
    /**
     * The picking map, created when a hit area is first tested: every renderer
     * gets a picking interaction, and most never use one.
     */
    private get map();
    /** The main picking interaction which is used by default. */
    static main: PickingInteraction;
    /**
     * Called by the renderer after each frame has been rendered. Runs inside
     * the frame so the picking map can be bound and released in balance with
     * the renderer's own render target stack.
     */
    postrender(): void;
    destroy(): void;
    /**
     * Hit tests a area using the specified x/y coordinates.
     * @param x The x coordinate.
     * @param y The y coordinate.
     * @param hitArea The hit area to test.
     */
    containsHitArea(x: number, y: number, hitArea: PickingHitArea): boolean;
}
