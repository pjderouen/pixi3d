import { Geometry } from "pixi.js";
/**
 * The interleaved vertex layout of the sprite batch: PixiJS' 2D batch layout
 * (position, texture coordinates, color, texture id) followed by the
 * sprite's model-view-projection matrix, as four columns.
 */
export declare class SpriteBatchGeometry extends Geometry {
    /** Floats per vertex: 6 for the 2D batch layout, 16 for the matrix. */
    static readonly vertexSize: number;
    constructor();
}
