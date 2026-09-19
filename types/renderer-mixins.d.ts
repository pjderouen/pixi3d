import type { Camera } from "./camera/camera";
import type { LightingEnvironment } from "./lighting/lighting-environment";
import type { PickingInteraction } from "./picking/picking-interaction";
import type { StandardPipeline } from "./pipeline/standard-pipeline";
declare global {
    namespace PixiMixins {
        interface RendererSystems {
            camera: Camera;
            lighting: LightingEnvironment;
            picking: PickingInteraction;
        }
        interface RendererPipes {
            pipeline: StandardPipeline;
        }
    }
}
export {};
