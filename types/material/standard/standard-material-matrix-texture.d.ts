import { Texture, Renderer } from "pixi.js";
export declare class StandardMaterialMatrixTexture extends Texture {
    private _buffer;
    private _bufferSource;
    static isSupported(renderer: Renderer): boolean;
    constructor(matrixCount: number);
    updateBuffer(buffer: Float32Array): void;
}
