import { glTFInterpolation } from "./gltf-interpolation";
/**
 * Represents an glTF animation channel which targets a specific node.
 */
export declare abstract class glTFChannel {
    private _position;
    private _frame;
    private _interpolation;
    private _input;
    /**
     * Creates a new channel with the specified input and interpolation.
     * @param input An array of inputs representing linear time in seconds.
     * @param interpolation The interpolation method to use.
     */
    constructor(input: ArrayLike<number>, interpolation: glTFInterpolation);
    /** The position (in seconds) for this channel. */
    get position(): number;
    set position(value: number);
    /** The duration (in seconds) for this channel. */
    get duration(): number;
    /** The current frame for this channel. */
    get frame(): number;
    /** The number of frames for this channel. */
    get length(): number;
    /**
     * Sets the position and updates the current frame and animation.
     * @param position The position to set for this channel.
     */
    setPosition(position: number): void;
    abstract updateTarget(data: ArrayLike<number>): void;
    /**
     * Updates the channel with the specified delta time in seconds.
     * @param delta The time (in seconds) since last frame.
     */
    update(delta: number): void;
    /**
     * Calculates the position within the specified frame.
     * @param frame The frame to calculate the position in.
     * @param position The position of this channel.
     */
    calculateFramePosition(frame: number, position: number): number;
    /**
     * Calculates the current frame for the specified position.
     * @param position The position of this channel.
     */
    calculateFrame(position: number): number;
}
