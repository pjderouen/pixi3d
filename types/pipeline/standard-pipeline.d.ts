import { InstructionSet, Instruction, WebGLRenderer } from "pixi.js";
import { MaterialRenderPass } from "./material-render-pass";
import { Mesh3D } from "../mesh/mesh";
import { ShadowRenderPass } from "../shadow/shadow-render-pass";
import { Model } from "../model";
import { ShadowCastingLight } from "../shadow/shadow-casting-light";
import { RenderPass } from "./render-pass";
import { SpriteBatchRenderer } from "../sprite/sprite-batch-renderer";
import { ProjectionSprite } from "../sprite/projection-sprite";
import { Sprite3D } from "../sprite/sprite";
/**
 * One run of consecutive meshes and sprites in the renderer's instruction
 * set. Everything collected into it is sorted and drawn together when the
 * renderer executes it, which is what lets transparent materials sort behind
 * opaque ones, lets the shadow pass run once for the batch and lets sprites
 * draw back to front after the meshes.
 */
interface PipelineInstruction extends Instruction {
    renderPipeId: "pipeline";
    canBundle: false;
    meshes: Mesh3D[];
    sprites: Sprite3D[];
}
/**
 * The standard pipeline renders meshes using the set render passes, and
 * sprites after them. It's created and used by default.
 *
 * In PixiJS v8 this is a render pipe: the renderer hands it every `Mesh3D`
 * and `Sprite3D` while building the frame's instruction set
 * (`addRenderable`), and calls `execute` when it reaches the pipeline's
 * instruction while drawing.
 */
export declare class StandardPipeline {
    renderer: WebGLRenderer;
    protected _spriteRenderer: SpriteBatchRenderer;
    protected _meshes: Mesh3D[];
    protected _sprites: ProjectionSprite[];
    protected _current?: PipelineInstruction;
    /** The pass used for rendering materials. */
    materialPass: MaterialRenderPass;
    /**
     * The pass used for rendering shadows. Created with the WebGL context,
     * which its shaders depend on; PixiJS v8 creates render pipes before it.
     */
    shadowPass: ShadowRenderPass;
    /** The array of render passes. Each mesh will be rendered with these passes (if it has been enabled on that mesh). */
    renderPasses: RenderPass[];
    /**
     * Creates a new standard pipeline using the specified renderer.
     * @param renderer The renderer to use.
     */
    constructor(renderer: WebGLRenderer);
    /**
     * Creates what depends on the WebGL context: the shadow pass and the
     * sprite renderer.
     */
    contextChange(): void;
    /**
     * Clears the render passes. Called by the renderer at the start of every
     * render, including renders to a texture.
     */
    renderStart(): void;
    /**
     * Adds a mesh or a sprite to the instruction set being built.
     * @param object The mesh or sprite to render.
     * @param instructionSet The instruction set currently being built.
     */
    addRenderable(object: Mesh3D | Sprite3D, instructionSet: InstructionSet): void;
    /** Nothing is cached per object; transforms are read when executing. */
    updateRenderable(object: Mesh3D | Sprite3D): void;
    /** The instruction set never needs rebuilding on account of an object. */
    validateRenderable(object: Mesh3D | Sprite3D): boolean;
    destroyRenderable(object: Mesh3D | Sprite3D): void;
    /**
     * Draws the meshes and sprites collected into an instruction.
     * @param instruction The instruction to execute.
     */
    execute(instruction: PipelineInstruction): void;
    /**
     * Adds an object to be rendered by the next `flush`. A sprite's projection
     * must be up to date (see `Sprite3D._render`).
     * @param object The object to render.
     */
    render(object: Mesh3D | ProjectionSprite): void;
    /**
     * Renders the added objects to the current render target: the meshes with
     * the render passes, then the sprites.
     */
    flush(): void;
    /**
     * Sorts the meshes by rendering order, and the sprites by their render
     * sort order and then back to front.
     */
    sort(): void;
    /**
     * Enables shadows for the specified object. Adds the shadow render pass to
     * the specified object and enables the standard material to use the casting
     * light.
     * @param object The mesh or model to enable shadows for.
     * @param light The shadow casting light to associate with the
     * object when using the standard material.
     */
    enableShadows(object: Mesh3D | Model, light?: ShadowCastingLight): void;
    /**
     * Disables shadows for the specified object.
     * @param object The mesh or model to disable shadows for.
     */
    disableShadows(object: Mesh3D | Model): void;
    destroy(): void;
}
export {};
