import { Color } from "../color";
import { Container3D } from "../container";
import { LightType } from "./light-type";
export declare class Light extends Container3D {
    /** The type of the light. */
    type: LightType;
    /** The color of the light. */
    color: Color;
    /** The range of the light. */
    range: number;
    /** The intensity of the light. */
    intensity: number;
    /** The inner cone angle specified in degrees. */
    innerConeAngle: number;
    /** The outer cone angle specified in degrees. */
    outerConeAngle: number;
}
