import { ShadowCastingLight } from "./shadow-casting-light";
export declare namespace ShadowMath {
    function calculateDirectionalLightViewProjection(shadowCastingLight: ShadowCastingLight): void;
    function calculateSpotLightViewProjection(shadowCastingLight: ShadowCastingLight): void;
}
