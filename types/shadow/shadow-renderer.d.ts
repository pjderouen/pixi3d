import { WebGLRenderer } from "pixi.js";
import { Mesh3D } from "../mesh/mesh";
import { ShadowCastingLight } from "./shadow-casting-light";
import { SkinningShader } from "./skinning-shader";
import { TextureShader } from "./texture-shader";
export declare class ShadowRenderer {
    renderer: WebGLRenderer;
    private _state;
    private _shadowShader;
    private _instancedShadowShader;
    private _skinningShader?;
    private _textureShader?;
    constructor(renderer: WebGLRenderer);
    getSkinningShader(): SkinningShader | TextureShader | undefined;
    render(mesh: Mesh3D, shadowCastingLight: ShadowCastingLight): void;
}
