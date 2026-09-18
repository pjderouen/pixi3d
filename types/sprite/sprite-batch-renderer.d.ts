import { Batcher, Shader } from "pixi.js";
import type { BatchableMeshElement, BatchableQuadElement, WebGLRenderer } from "pixi.js";
import { SpriteBatchGeometry } from "./sprite-batch-geometry";
import type { ProjectionSprite } from "./projection-sprite";
/**
 * Batches and draws sprites in 3D space. Built on PixiJS' `Batcher`, which
 * does the texture batching; every vertex also carries its sprite's
 * model-view-projection matrix, so sprites with different transforms still
 * share a draw call. The standard pipeline draws the sprites of a frame
 * through this after the meshes, sorted back to front.
 */
export declare class SpriteBatchRenderer extends Batcher {
    renderer: WebGLRenderer;
    readonly name = "sprite3d";
    protected vertexSize: number;
    geometry: SpriteBatchGeometry;
    shader: Shader;
    private _pool;
    private _instructions;
    private _state;
    /**
     * Creates a new sprite batch renderer.
     * @param renderer The renderer to draw with.
     */
    constructor(renderer: WebGLRenderer);
    /**
     * Draws the specified sprites, in the order given. Their projections must
     * be up to date (see `Sprite3D._render`).
     * @param sprites The sprites to draw.
     */
    render(sprites: ProjectionSprite[]): void;
    /**
     * Packs one sprite's quad: position, texture coordinates, color and
     * texture id per corner, as the 2D batch does, then the sprite's
     * model-view-projection matrix.
     */
    packQuadAttributes(element: BatchableQuadElement, float32View: Float32Array, uint32View: Uint32Array, index: number, textureId: number): void;
    /** Sprites are always quads; see `packQuadAttributes`. */
    packAttributes(_element: BatchableMeshElement, _float32View: Float32Array, _uint32View: Uint32Array, _index: number, _textureId: number): void;
    /**
     * Packs a tint and an alpha into the batch's color layout (ABGR bytes),
     * rounding as PixiJS v7 did. For textures with premultiplied alpha, the
     * color is premultiplied too.
     * @param tint The tint, as 0xRRGGBB.
     * @param alpha The alpha, 0 to 1.
     * @param premultiplied Whether the texture has premultiplied alpha.
     */
    static packColor(tint: number, alpha: number, premultiplied: boolean): number;
    destroy(): void;
}
