import { Ticker, EventEmitter } from "pixi.js";
/**
 * Represents an animation.
 */
export declare abstract class Animation extends EventEmitter {
    name?: string | undefined;
    private _ticker?;
    private _update?;
    /** The duration (in seconds) of this animation. */
    abstract readonly duration: number;
    /** The current position (in seconds) of this animation. */
    abstract position: number;
    /** The speed that the animation will play at. */
    speed: number;
    /** A value indicating if the animation is looping. */
    loop: boolean;
    /**
     * Creates a new animation with the specified name.
     * @param name Name for the animation.
     */
    constructor(name?: string | undefined);
    /**
     * Starts playing the animation using the specified ticker.
     * @param ticker The ticker to use for updating the animation. If a ticker
     * is not given, the shared ticker will be used.
     */
    play(ticker?: Ticker): void;
    /**
     * Stops playing the animation.
     */
    stop(): void;
    /**
     * Updates the animation by the specified delta time.
     * @param delta The time in seconds since last frame.
     */
    update(delta: number): void;
}
