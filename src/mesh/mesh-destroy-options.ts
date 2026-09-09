import { DestroyOptions } from "pixi.js"
export interface MeshDestroyOptions extends DestroyOptions {
  geometry?: boolean
  material?: boolean
}