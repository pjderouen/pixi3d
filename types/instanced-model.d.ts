import { Container3D } from "./container";
import { InstancedMesh3D } from "./mesh/instanced-mesh";
import { Model } from "./model";
/**
 * Represents an instance of a model.
 */
export declare class InstancedModel extends Container3D {
    /** The meshes included in the model. */
    meshes: InstancedMesh3D[];
    /**
     * Creates a new model instance from the specified model.
     * @param model The model to create instance from.
     */
    constructor(model: Model);
}
