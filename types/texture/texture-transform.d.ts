import { ObservablePoint, Texture } from "pixi.js";
/**
 * Transform used to offset, rotate and scale texture coordinates.
 */
export declare class TextureTransform {
    private _rotation;
    private _array;
    private _dirty;
    private _translation;
    private _scaling;
    private _rotate;
    /** The rotation for the texture coordinates. */
    get rotation(): number;
    set rotation(value: number);
    /** The offset for the texture coordinates. */
    offset: ObservablePoint;
    /** The scale of the texture coordinates. */
    scale: ObservablePoint;
    /** The matrix array. */
    get array(): Float32Array<ArrayBuffer>;
    /**
     * Creates a transform from the specified texture frame. Can be used when
     * texture is in a spritesheet.
     * @param texture The texture to use.
     */
    static fromTexture(texture: Texture): TextureTransform;
}
