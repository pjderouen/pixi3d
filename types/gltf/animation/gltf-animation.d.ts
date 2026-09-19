import { Animation } from "../../animation";
import { glTFChannel } from "./gltf-channel";
/**
 * Represents an animation loaded from a glTF model.
 */
export declare class glTFAnimation extends Animation {
    private _duration;
    private _position;
    private _channels;
    /**
     * Creates a new glTF animation.
     * @param channels The channels used by this animation.
     * @param name The name for the animation.
     */
    constructor(channels: glTFChannel[], name?: string);
    /** The duration (in seconds) of this animation. */
    get duration(): number;
    /** The current position (in seconds) of this animation. */
    get position(): number;
    set position(value: number);
}
