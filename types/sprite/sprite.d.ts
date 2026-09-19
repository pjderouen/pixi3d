import { ColorSource, DestroyOptions, InstructionSet, ObservablePoint, Renderer, RenderLayer, Texture } from "pixi.js";
import type { BLEND_MODES } from "pixi.js";
import { Camera } from "../camera/camera";
import { SpriteBillboardType } from "./sprite-billboard-type";
import { Container3D } from "../container";
import { ProjectionSprite } from "./projection-sprite";
/**
 * Represents a sprite in 3D space.
 */
export declare class Sprite3D extends Container3D {
    /**
     * The name of the render pipe that draws the sprite. Sprites are drawn by
     * the standard pipeline, after the meshes and sorted back to front.
     */
    renderPipeId: string;
    private _sprite;
    private _modelView;
    private _cameraTransformId?;
    private _billboardType?;
    private _parentID?;
    /**
     * The camera used when rendering the sprite. Uses main camera by default.
     */
    camera?: Camera;
    /**
     * Creates a new sprite using the specified texture.
     * @param texture The texture to use.
     */
    constructor(texture?: Texture);
    /**
     * The billboard type to use when rendering the sprite. Used for making the
     * sprite always face the viewer.
     */
    get billboardType(): SpriteBillboardType | undefined;
    set billboardType(value: SpriteBillboardType | undefined);
    /** Defines the size of the sprite relative to a unit in world space. */
    get pixelsPerUnit(): number;
    set pixelsPerUnit(value: number);
    /** Used for sorting the sprite before render. */
    get renderSortOrder(): number;
    set renderSortOrder(value: number);
    /**
     * The tint applied to the sprite. This is a hex value. A value of 0xFFFFFF
     * will remove any tint effect. It tints this sprite only, not its children.
     */
    get tint(): number;
    set tint(value: ColorSource);
    /** The flat sprite the sprite batch renderer draws. */
    get projectionSprite(): ProjectionSprite;
    /**
     * Destroys this sprite and optionally its texture and children.
     */
    destroy(options?: boolean | DestroyOptions): void;
    /**
     * Hands the sprite to its render pipe while the renderer builds its
     * instruction set, then lets the children collect themselves as usual.
     * @internal
     */
    collectRenderablesSimple(instructionSet: InstructionSet, renderer: Renderer, currentLayer: RenderLayer): void;
    /**
     * Brings the sprite's projection up to date with its camera: the
     * model-view-projection matrix (with the billboard applied), the distance
     * used for sorting, the quad and the alpha. The standard pipeline calls
     * this before it sorts and draws the sprites.
     * @param renderer The renderer to use.
     */
    _render(renderer: Renderer): void;
    /**
     * The anchor sets the origin point of the sprite.
     */
    get anchor(): ObservablePoint;
    set anchor(value: ObservablePoint);
    /** The texture used when rendering the sprite. */
    get texture(): Texture;
    set texture(value: Texture);
    /** The blend used when rendering the sprite. */
    get blendMode(): BLEND_MODES;
    set blendMode(value: BLEND_MODES);
}
