import { InstructionSet, Instruction, WebGLRenderer } from "pixi.js"
import { MaterialRenderPass } from "./material-render-pass"
import { Mesh3D } from "../mesh/mesh"
import { ShadowRenderPass } from "../shadow/shadow-render-pass"
import { Model } from "../model"
import { ShadowCastingLight } from "../shadow/shadow-casting-light"
import { RenderPass } from "./render-pass"
import { StandardMaterial } from "../material/standard/standard-material"
import { MaterialRenderSortType } from "../material/material-render-sort-type"
import { Compatibility } from "../compatibility/compatibility"

/**
 * One run of consecutive meshes in the renderer's instruction set. All the
 * meshes collected into it are sorted and drawn together when the renderer
 * executes it, which is what lets transparent materials sort behind opaque
 * ones and lets the shadow pass run once for the batch.
 */
interface PipelineInstruction extends Instruction {
  renderPipeId: "pipeline"
  canBundle: false
  meshes: Mesh3D[]
}

/**
 * The standard pipeline renders meshes using the set render passes. It's
 * created and used by default.
 *
 * In PixiJS v8 this is a render pipe: the renderer hands it every `Mesh3D`
 * while building the frame's instruction set (`addRenderable`), and calls
 * `execute` when it reaches the pipeline's instruction while drawing.
 */
export class StandardPipeline {
  protected _meshes: Mesh3D[] = []
  protected _current?: PipelineInstruction
  protected _shadowPass?: ShadowRenderPass

  /** The pass used for rendering materials. */
  materialPass: MaterialRenderPass

  /**
   * The pass used for rendering shadows. Created the first time shadows are
   * enabled (`enableShadows`), so scenes without shadows never pay for the
   * shadow map resources.
   */
  get shadowPass() {
    if (!this._shadowPass) {
      this._shadowPass = new ShadowRenderPass(this.renderer, "shadow")
      this.renderPasses.unshift(this._shadowPass)
    }
    return this._shadowPass
  }

  /** The array of render passes. Each mesh will be rendered with these passes (if it has been enabled on that mesh). */
  renderPasses: RenderPass[]

  /**
   * Creates a new standard pipeline using the specified renderer.
   * @param renderer The renderer to use.
   */
  constructor(public renderer: WebGLRenderer) {
    this.materialPass = new MaterialRenderPass(renderer, "material")
    this.renderPasses = [this.materialPass]
  }

  /** Called by the renderer before each frame is drawn. */
  renderStart() {
    for (let pass of this.renderPasses) {
      if (pass.clear) { pass.clear() }
    }
  }

  /**
   * Adds a mesh to the instruction set being built.
   * @param mesh The mesh to render.
   * @param instructionSet The instruction set currently being built.
   */
  addRenderable(mesh: Mesh3D, instructionSet: InstructionSet) {
    this.renderer.renderPipes.batch.break(instructionSet)
    const last = instructionSet.instructions[instructionSet.instructionSize - 1]
    if (!this._current || last !== this._current) {
      this._current = { renderPipeId: "pipeline", canBundle: false, meshes: [] }
      instructionSet.add(this._current)
    }
    this._current.meshes.push(mesh)
  }

  /** Nothing is cached per mesh; transforms are read when executing. */
  updateRenderable(mesh: Mesh3D) { }

  /** The instruction set never needs rebuilding on account of a mesh. */
  validateRenderable(mesh: Mesh3D) {
    return false
  }

  destroyRenderable(mesh: Mesh3D) {
    if (this._current) {
      const index = this._current.meshes.indexOf(mesh)
      if (index >= 0) {
        this._current.meshes.splice(index, 1)
      }
    }
  }

  /**
   * Draws the meshes collected into an instruction.
   * @param instruction The instruction to execute.
   */
  execute(instruction: PipelineInstruction) {
    this._meshes = instruction.meshes.filter(mesh => mesh.isRenderable)
    for (let mesh of this._meshes) {
      mesh.updateTransform3D()
      if (mesh.skin) {
        mesh.skin.calculateJointMatrices()
      }
    }
    this.sort()
    for (let pass of this.renderPasses) {
      pass.render(this._meshes.filter(mesh => mesh.isRenderPassEnabled(pass.name)))
    }
    this._meshes = []
  }

  /**
   * Sorts the meshes by rendering order.
   */
  sort() {
    this._meshes.sort((a, b) => {
      if (!a.material || !b.material) {
        return 0
      }
      if (a.material.renderSortType !== b.material.renderSortType) {
        return a.material.renderSortType === MaterialRenderSortType.transparent ? 1 : -1
      }
      if (a.renderSortOrder === b.renderSortOrder) {
        return 0
      }
      return a.renderSortOrder < b.renderSortOrder ? -1 : 1
    })
  }

  /**
   * Enables shadows for the specified object. Adds the shadow render pass to
   * the specified object and enables the standard material to use the casting
   * light.
   * @param object The mesh or model to enable shadows for.
   * @param light The shadow casting light to associate with the
   * object when using the standard material.
   */
  enableShadows(object: Mesh3D | Model, light?: ShadowCastingLight) {
    let meshes = object instanceof Model ? object.meshes : [object]
    for (let mesh of meshes) {
      if (light && mesh.material instanceof StandardMaterial) {
        mesh.material.shadowCastingLight = light
      }
      mesh.enableRenderPass(this.shadowPass.name)
    }
    if (light) {
      this.shadowPass.addShadowCastingLight(light)
    }
  }

  /**
   * Disables shadows for the specified object.
   * @param object The mesh or model to disable shadows for.
   */
  disableShadows(object: Mesh3D | Model) {
    let meshes = object instanceof Model ? object.meshes : [object]
    for (let mesh of meshes) {
      if (mesh.material instanceof StandardMaterial) {
        mesh.material.shadowCastingLight = undefined
      }
      mesh.disableRenderPass(this.shadowPass.name)
    }
  }

  destroy() {
    this._meshes = []
    this._current = undefined
  }
}

Compatibility.installRendererPipe("pipeline", StandardPipeline)
