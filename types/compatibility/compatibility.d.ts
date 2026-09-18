import { Renderer } from "pixi.js";
/**
 * The seams between Pixi3D and the PixiJS renderer. Pixi3D historically
 * supported PixiJS v5-v7 through a set of version shims here; the v8 port is
 * v8-only (WebGL backend), so this is now just the registration helpers.
 */
export declare namespace Compatibility {
    /**
     * Registers a render pipe, the v8 equivalent of an "object renderer"
     * plugin. The pipe class is constructed once per renderer and exposed as
     * `renderer.renderPipes[name]`.
     * @param name The name of the pipe.
     * @param pipe The pipe class.
     */
    function installRendererPipe(name: string, pipe: any): void;
    /**
     * Registers a renderer system: a class constructed once per renderer with
     * the renderer as its argument and exposed as `renderer[name]`. Used for
     * the objects that v7 registered as plain renderer plugins (camera,
     * lighting, picking).
     * @param name The name of the system.
     * @param system The system class.
     */
    function installRendererSystem(name: string, system: any): void;
    /**
     * Returns a value indicating if the renderer has been destroyed.
     * @param renderer The renderer to check.
     */
    function isRendererDestroyed(renderer: Renderer): boolean;
}
