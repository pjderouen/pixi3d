import { Sprite, Texture } from "pixi.js";
import { Matrix4x4 } from "../transform/matrix";
/**
 * The flat sprite behind a `Sprite3D`. It keeps the texture, anchor, tint and
 * blend mode with PixiJS' own sprite semantics, plus the quad and the matrix
 * the sprite batch renderer draws it with. It is never part of a scene.
 */
export declare class ProjectionSprite extends Sprite {
    private _pixelsPerUnit;
    /**
     * Squared distance from the camera along the camera's forward axis, used
     * for drawing sprites back to front.
     */
    distanceFromCamera: number;
    /** Transforms the quad from the sprite's local units to clip space. */
    modelViewProjection: Matrix4x4;
    /**
     * The quad's corners in the sprite's local units, x and y for the top left,
     * top right, bottom right and bottom left corners. Set by
     * `calculateVertices`.
     */
    vertexData: Float32Array<ArrayBuffer>;
    /** The alpha of the `Sprite3D` drawing this sprite, including its ancestors'. */
    worldAlpha: number;
    constructor(texture?: Texture);
    get pixelsPerUnit(): number;
    set pixelsPerUnit(value: number);
    /**
     * Updates `vertexData` from the texture's size and trim, the anchor and
     * `pixelsPerUnit`. The y axis points up, as it does in 3D, while the image
     * rows run down.
     * @param resolution The resolution to round the corners to when
     * `roundPixels` is set.
     */
    calculateVertices(resolution?: number): void;
}
