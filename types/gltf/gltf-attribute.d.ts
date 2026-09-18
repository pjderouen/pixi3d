/**
 * Represents data for a specific geometry attribute.
 */
export declare class glTFAttribute {
    buffer: Uint32Array | Float32Array | Int8Array | Uint8Array | Int16Array | Uint16Array;
    componentType: number;
    stride: number;
    componentCount: number;
    normalized: boolean;
    min?: number[] | undefined;
    max?: number[] | undefined;
    constructor(buffer: Uint32Array | Float32Array | Int8Array | Uint8Array | Int16Array | Uint16Array, componentType: number, stride: number | undefined, componentCount: number, normalized?: boolean, min?: number[] | undefined, max?: number[] | undefined);
    static from(componentType: number, componentCount: number, buffer: ArrayBuffer, offset: number, size: number, stride?: number, normalized?: boolean, min?: number[], max?: number[]): glTFAttribute;
}
