import { Geometry } from "pixi.js";
import { InstancedMesh3D } from "../mesh/instanced-mesh";
export declare class ShadowShaderInstancing {
    private _maxInstances;
    private _modelMatrix;
    constructor();
    expandBuffers(instanceCount: number): void;
    updateBuffers(instances: InstancedMesh3D[]): void;
    addGeometryAttributes(geometry: Geometry): void;
}
