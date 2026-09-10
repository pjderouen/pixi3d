// Smoke test for the PixiJS v8 port. Imports only the modules ported so far;
// widen the imports as more of the library comes across.
import { Application } from "pixi.js"
import "../../src/pipeline/standard-pipeline"
import { Mesh3D } from "../../src/mesh/mesh"
import { Camera } from "../../src/camera/camera"
import { LightingEnvironment } from "../../src/lighting/lighting-environment"
import { Light } from "../../src/lighting/light"
import { LightType } from "../../src/lighting/light-type"
import { StandardMaterial } from "../../src/material/standard/standard-material"
import { Color } from "../../src/color"

declare global {
  interface Window { __PIXI_APP__: Application; __PIXI3D_READY__: boolean; __PIXI3D_ERROR__?: string }
}

async function main() {
  const app = new Application()
  await app.init({
    preference: "webgl",
    background: 0xdddddd,
    resizeTo: window,
    antialias: true,
  })
  document.body.appendChild(app.canvas)
  window.__PIXI_APP__ = app

  const light = Object.assign(new Light(), {
    intensity: 1,
    type: LightType.directional,
  })
  light.rotationQuaternion.setEulerAngles(25, 120, 0)
  LightingEnvironment.main.lights.push(light)

  const cube = app.stage.addChild(Mesh3D.createCube())
  const material = <StandardMaterial>cube.material
  material.baseColor = new Color(0.85, 0.3, 0.2)
  material.metallic = 0
  material.roughness = 0.6

  const ground = app.stage.addChild(Mesh3D.createPlane())
  ground.y = -1.2
  ground.scale.set(6, 1, 6)
  const groundMaterial = <StandardMaterial>ground.material
  groundMaterial.baseColor = new Color(0.4, 0.45, 0.5)
  groundMaterial.metallic = 0
  groundMaterial.roughness = 1

  Camera.main.position.set(0, 2, 6)
  Camera.main.rotationQuaternion.setEulerAngles(18, 180, 0)

  let angle = 0
  app.ticker.add((ticker) => {
    angle += ticker.deltaTime
    cube.rotationQuaternion.setEulerAngles(angle * 0.7, angle, 0)
  })
  window.__PIXI3D_READY__ = true
}

main().catch((error) => {
  window.__PIXI3D_ERROR__ = String(error?.stack || error)
  console.error(error)
})
