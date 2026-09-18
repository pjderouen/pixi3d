import { expect } from "chai"

describe("Picking interaction", () => {

  // Renders a cube with a picking hit area twice (the first frame registers
  // the hit area, after which the picking map is drawn) and hit tests the
  // specified points. Runs in the page; returns which points hit the cube.
  const hitTestCube = async (points) => {
    let renderer = await PIXI.autoDetectRenderer({ width: 800, height: 600, preference: "webgl" })
    let mesh = PIXI3D.Mesh3D.createCube()
    mesh.hitArea = new PIXI3D.PickingHitArea(mesh)
    mesh.eventMode = "static"
    renderer.render(mesh)
    renderer.render(mesh)
    const boundary = new PIXI.EventBoundary(mesh)
    const hits = points.map(([x, y]) => boundary.hitTest(x, y) === mesh)
    renderer.destroy()
    return hits
  }

  it("should hit test for mesh using pixi *.*.*", async () => {
    expect(await evaluateInPage(hitTestCube, [[400, 300]])).to.deep.equal([true])
  })

  it("should not hit test for mesh using pixi *.*.*", async () => {
    expect(await evaluateInPage(hitTestCube, [[100, 100]])).to.deep.equal([false])
  })
})
