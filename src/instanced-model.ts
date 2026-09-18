import { Container3D } from "./container"
import { InstancedMesh3D } from "./mesh/instanced-mesh"
import { Model } from "./model"
import { Mesh3D } from "./mesh/mesh"

// Container3D's 3D position/scale accessors make it structurally incompatible
// with the `ContainerChild` type v8's `addChild` is declared against, hence
// the casts; the runtime hierarchy is unchanged.
function clone(node: Container3D, parent: Container3D, meshes: InstancedMesh3D[]) {
  for (let child of node.children) {
    if (child instanceof Mesh3D) {
      const mesh = child.createInstance()
      mesh.name = child.name
      parent.addChild(<any>mesh)
      meshes.push(mesh)
    }
    else if (child instanceof Container3D) {
      const copy = new Container3D()
      parent.addChild(<any>copy)
      copy.name = node.name
      copy.position = child.position
      copy.scale = child.scale
      copy.rotationQuaternion = child.rotationQuaternion
      clone(child, copy, meshes)
    }
  }
}

/**
 * Represents an instance of a model.
 */
export class InstancedModel extends Container3D {
  /** The meshes included in the model. */
  meshes: InstancedMesh3D[] = []

  /**
   * Creates a new model instance from the specified model.
   * @param model The model to create instance from.
   */
  constructor(model: Model) {
    super()
    clone(model, this, this.meshes)
  }
}