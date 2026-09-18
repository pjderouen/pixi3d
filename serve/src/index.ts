// Render harness for the PixiJS v8 port. Pick a scene with the URL hash:
//   #cube      a lit StandardMaterial cube on a plane (the render core)
//   #teapot    a glTF model loaded through Assets (loaders + glTF parser)
//   #material  a cube drawn with a custom Material.from shader
//   #demo      the original demo: IBL cubemaps, teapot, ground, a shadow-
//              casting light and orbit control
// Imports are per module, not from src/index, so a subsystem that is not
// ported yet cannot break the scenes that are.
import { Application, Assets } from "pixi.js"
import "../../src/pipeline/standard-pipeline"
import "../../src/loader/gltf-loader"
import "../../src/loader/cubemap-loader"
import { Mesh3D } from "../../src/mesh/mesh"
import { Model } from "../../src/model"
import { Camera } from "../../src/camera/camera"
import { CameraOrbitControl } from "../../src/camera/camera-orbit-control"
import { LightingEnvironment } from "../../src/lighting/lighting-environment"
import { ImageBasedLighting } from "../../src/lighting/image-based-lighting"
import { Light } from "../../src/lighting/light"
import { LightType } from "../../src/lighting/light-type"
import { Material } from "../../src/material/material"
import { StandardMaterial } from "../../src/material/standard/standard-material"
import { ShadowCastingLight } from "../../src/shadow/shadow-casting-light"
import { ShadowQuality } from "../../src/shadow/shadow-quality"
import { Cubemap } from "../../src/cubemap/cubemap"
import { Color } from "../../src/color"
import type { StandardPipeline } from "../../src/pipeline/standard-pipeline"
import type { glTFAsset } from "../../src/gltf/gltf-asset"

declare global {
  interface Window {
    __PIXI_APP__: Application
    __PIXI3D_READY__: boolean
    __PIXI3D_ERROR__?: string
    __PIXI3D_SCENE__?: string
    __PIXI3D_SHADER_ERRORS__: { log: string, source: string }[]
  }
}

// Every shader that fails to compile, with its source, for whoever checks the
// scene: Pixi3D compiles its mesh shaders itself, outside PixiJS' program
// cache, so a failure there shows only as a mesh that never draws.
window.__PIXI3D_SHADER_ERRORS__ = []
for (const context of [WebGLRenderingContext, WebGL2RenderingContext]) {
  const compileShader = context.prototype.compileShader
  context.prototype.compileShader = function (this: WebGLRenderingContext, shader: WebGLShader) {
    compileShader.call(this, shader)
    if (!this.getShaderParameter(shader, this.COMPILE_STATUS)) {
      window.__PIXI3D_SHADER_ERRORS__.push({
        log: this.getShaderInfoLog(shader) ?? "",
        source: this.getShaderSource(shader) ?? "",
      })
    }
  }
}

function addDirectionalLight(intensity = 1) {
  const light = Object.assign(new Light(), { intensity, type: LightType.directional })
  light.rotationQuaternion.setEulerAngles(25, 120, 0)
  LightingEnvironment.main.lights.push(light)
  return light
}

function matte(mesh: Mesh3D, r: number, g: number, b: number) {
  const material = <StandardMaterial>mesh.material
  material.baseColor = new Color(r, g, b)
  material.metallic = 0
  material.roughness = 0.8
  return mesh
}

function cubeScene(app: Application) {
  addDirectionalLight()
  const cube = app.stage.addChild(matte(Mesh3D.createCube(), 0.85, 0.3, 0.2))
  const ground = app.stage.addChild(matte(Mesh3D.createPlane(), 0.4, 0.45, 0.5))
  ground.y = -1.2
  ground.scale.set(6, 1, 6)
  Camera.main.position.set(0, 2, 6)
  Camera.main.rotationQuaternion.setEulerAngles(18, 180, 0)
  let angle = 0
  app.ticker.add((ticker) => {
    angle += ticker.deltaTime
    cube.rotationQuaternion.setEulerAngles(angle * 0.7, angle, 0)
  })
}

async function teapotScene(app: Application) {
  addDirectionalLight(2)
  const asset = await Assets.load<glTFAsset>("assets/teapot/teapot.gltf")
  const model = app.stage.addChild(Model.from(asset))
  model.y = -0.8
  Camera.main.position.set(0, 1, 4)
  Camera.main.rotationQuaternion.setEulerAngles(12, 180, 0)
}

const normalsVertex = `
attribute vec3 a_Position;
attribute vec3 a_Normal;
uniform mat4 u_Model;
uniform mat4 u_ViewProjection;
varying vec3 v_Normal;
void main() {
  v_Normal = a_Normal;
  gl_Position = u_ViewProjection * u_Model * vec4(a_Position, 1.0);
}`

const normalsFragment = `
varying vec3 v_Normal;
void main() {
  gl_FragColor = vec4(v_Normal * 0.5 + 0.5, 1.0);
}`

function materialScene(app: Application) {
  const material = Material.from(normalsVertex, normalsFragment, (mesh, shader) => {
    shader.uniforms.u_Model = mesh.worldTransform.array
    shader.uniforms.u_ViewProjection = Camera.main.viewProjection.array
  })
  const cube = app.stage.addChild(Mesh3D.createCube(material))
  Camera.main.position.set(0, 2, 6)
  Camera.main.rotationQuaternion.setEulerAngles(18, 180, 0)
  let angle = 0
  app.ticker.add((ticker) => {
    angle += ticker.deltaTime
    cube.rotationQuaternion.setEulerAngles(angle * 0.5, angle, 0)
  })
}

async function demoScene(app: Application) {
  const control = new CameraOrbitControl(app.canvas)
  control.enableDamping = true

  const [diffuse, specular, teapot] = await Promise.all([
    Assets.load<Cubemap>("assets/chromatic/diffuse.cubemap"),
    Assets.load<Cubemap>("assets/chromatic/specular.cubemap"),
    Assets.load<glTFAsset>("assets/teapot/teapot.gltf"),
  ])
  LightingEnvironment.main.imageBasedLighting = new ImageBasedLighting(diffuse, specular)

  const model = app.stage.addChild(Model.from(teapot))
  model.y = -0.8
  model.meshes.forEach((mesh) => {
    (<StandardMaterial>mesh.material).exposure = 1.3
  })

  const ground = app.stage.addChild(Mesh3D.createPlane())
  ground.y = -0.8
  ground.scale.set(10, 1, 10)

  const directionalLight = addDirectionalLight(1)
  const shadowCastingLight = new ShadowCastingLight(
    <any>app.renderer, directionalLight, { shadowTextureSize: 1024, quality: ShadowQuality.medium })
  shadowCastingLight.softness = 1
  shadowCastingLight.shadowArea = 15

  const pipeline = <StandardPipeline>(<any>app.renderer.renderPipes).pipeline
  pipeline.enableShadows(ground, shadowCastingLight)
  pipeline.enableShadows(model, shadowCastingLight)
}

async function main() {
  const scene = location.hash.slice(1) || "cube"
  window.__PIXI3D_SCENE__ = scene
  const app = new Application()
  await app.init({
    preference: "webgl",
    background: 0xdddddd,
    resizeTo: window,
    antialias: true,
  })
  document.body.appendChild(app.canvas)
  window.__PIXI_APP__ = app

  switch (scene) {
    case "teapot": await teapotScene(app); break
    case "material": materialScene(app); break
    case "demo": await demoScene(app); break
    default: cubeScene(app)
  }
  window.__PIXI3D_READY__ = true
}

main().catch((error) => {
  window.__PIXI3D_ERROR__ = String(error?.stack || error)
  console.error(error)
})
