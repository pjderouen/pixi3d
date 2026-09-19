/**
 * Represents a color containing RGBA components.
 */
export declare class Color {
    private _array4;
    private _array3;
    /**
     * Creates a new color with the specified components (in range 0-1).
     * @param r The R (red) component.
     * @param g The G (green) component.
     * @param b The B (blue) component.
     * @param a The A (alpha) component.
     */
    constructor(r?: number, g?: number, b?: number, a?: number);
    /**
     * Creates a new color with the specified components (in range 0-255).
     * @param r The R (red) component.
     * @param g The G (green) component.
     * @param b The B (blue) component.
     * @param a The A (alpha) component.
     */
    static fromBytes(r?: number, g?: number, b?: number, a?: number): Color;
    /**
     * Creates a new color from the specified hex value.
     * @param hex The hex value as a string or a number.
     */
    static fromHex(hex: number | string): Color;
    /** The color as an typed array containing RGB. */
    get rgb(): Float32Array<ArrayBufferLike>;
    /** The color as an typed array containing RGBA. */
    get rgba(): Float32Array<ArrayBufferLike>;
    /** The R (red) component. */
    get r(): number;
    set r(value: number);
    /** The G (green) component. */
    get g(): number;
    set g(value: number);
    /** The B (blue) component. */
    get b(): number;
    set b(value: number);
    /** The A (alpha) component. */
    get a(): number;
    set a(value: number);
    /**
     * Creates a new color from the specified source.
     * @param source The source to create the color from.
     */
    static from(source: number[] | Float32Array): Color;
}
