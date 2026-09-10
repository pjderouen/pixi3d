import { Container } from "pixi.js"
import { Quaternion } from "./transform/quaternion"
import { Transform3D } from "./transform/transform"
import { IPoint3DData, Point3D } from "./transform/point"

/**
 * A container represents a collection of 3D objects.
 *
 * In PixiJS v8 the renderer no longer walks a `transform` object per
 * container, so the 3D hierarchy keeps its own `Transform3D` and updates it
 * on demand through `updateTransform3D` (the render pipeline calls it for
 * every mesh it draws; cameras and lights call it themselves).
 */
export class Container3D extends Container {
  /** The 3D transform (position, scale, rotation and the derived matrices). */
  transform = new Transform3D()

  // The four accessors below replace v8's 2D `ObservablePoint` position and
  // scale with 3D points. `Point3D` no longer extends `ObservablePoint` (see
  // point.ts), so TypeScript rejects the override; the runtime contract is
  // the one Pixi3D always had (`container.x` reads and writes the 3D x).
  // @ts-ignore incompatible override, by design
  set position(value: IPoint3DData) {
    this.transform.position.copyFrom(value)
  }

  // @ts-ignore incompatible override, by design
  get position(): Point3D {
    return this.transform.position
  }

  // @ts-ignore incompatible override, by design
  set scale(value: IPoint3DData) {
    this.transform.scale.copyFrom(value)
  }

  // @ts-ignore incompatible override, by design
  get scale(): Point3D {
    return this.transform.scale
  }

  set rotationQuaternion(value: Quaternion) {
    this.transform.rotationQuaternion.copyFrom(value)
  }

  /** The quaternion rotation of the object. */
  get rotationQuaternion(): Quaternion {
    return this.transform.rotationQuaternion
  }

  /** The position of the object on the z axis relative to the local
   * coordinates of the parent. */
  get z() {
    return this.transform.position.z
  }

  set z(value: number) {
    this.transform.position.z = value
  }

  /** The 3D transformation matrix in local space. */
  get localTransform3D() {
    return this.transform.localTransform
  }

  /** The 3D transformation matrix in world space. */
  get worldTransform() {
    return this.transform.worldTransform
  }

  /**
   * Updates the 3D world transform of this object, updating its 3D ancestors
   * first. Cheap when nothing changed (ids are compared, no matrix math).
   */
  updateTransform3D() {
    const parent = this.parent
    if (parent instanceof Container3D) {
      parent.updateTransform3D()
      this.transform.updateTransform(parent.transform)
    } else {
      this.transform.updateTransform()
    }
  }
}
