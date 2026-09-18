import { ImageSource, Texture } from "pixi.js";
import type { glTFTexture } from "./gltf-texture";
import { glTFAsset } from "./gltf-asset";
import { glTFAnimation } from "./animation/gltf-animation";
import { glTFAttribute } from "./gltf-attribute";
import { Mesh3D } from "../mesh/mesh";
import { Container3D } from "../container";
import { Material } from "../material/material";
import { MaterialFactory } from "../material/material-factory";
import { Model } from "../model";
import { Skin } from "../skinning/skin";
/**
 * Parses glTF assets and creates models and meshes.
 */
export declare class glTFParser {
    private _asset;
    private _materialFactory;
    private _descriptor;
    /**
     * Creates a new parser using the specified asset.
     * @param asset The asset to parse.
     * @param materialFactory The material factory to use.
     */
    constructor(asset: glTFAsset, materialFactory?: MaterialFactory);
    /**
     * Creates a model from the specified asset.
     * @param asset The asset to create the model from.
     * @param materialFactory The material factory to use.
     */
    static createModel(asset: glTFAsset, materialFactory?: MaterialFactory): Model;
    /**
     * Creates a mesh from the specified asset.
     * @param asset The asset to create the mesh from.
     * @param materialFactory The material factory to use.
     * @param mesh The mesh index in the JSON descriptor.
     */
    static createMesh(asset: glTFAsset, materialFactory?: MaterialFactory, mesh?: number): Mesh3D[];
    /**
     * Creates a new buffer view from the specified accessor.
     * @param accessor The accessor object or index.
     */
    parseBuffer(accessor: any): glTFAttribute | undefined;
    /**
     * Creates an animation from the specified animation.
     * @param animation The source animation object or index.
     * @param nodes The array of nodes which are potential targets for the animation.
     */
    parseAnimation(animation: any, nodes: Container3D[]): glTFAnimation;
    /**
     * Creates a material from the specified source.
     * @param material The source material object or index.
     */
    parseMaterial(material?: any): Material;
    /**
     * Creates a material texture from a glTF texture info object (the
     * `{ index, texCoord, extensions }` reference a material makes to a
     * texture). Each material gets its own `Texture` over the shared source so
     * the per-material uv set and transform do not leak between materials.
     * @param info The texture info object.
     */
    parseTextureInfo<T extends glTFTexture>(info: any): T;
    /**
     * Returns the texture used by the specified object.
     * @param index The index of the texture in the JSON descriptor.
     */
    parseTexture(index: number): Texture<ImageSource>;
    findTextureSource(obj: any): number | undefined;
    /**
     * Creates an array of meshes from the specified mesh.
     * @param mesh The source mesh object or index.
     * @returns An array which contain arrays of meshes. This is because of the
     * structure used in glTF, where each mesh contain a number of primitives.
     * Read more about this in discussion at https://github.com/KhronosGroup/glTF/issues/821
     */
    parseMesh(mesh: any): Mesh3D[];
    /**
     * Creates a skin from the specified source.
     * @param skin The source skin object or index.
     * @param target The target container for the skin.
     * @param nodes The array of nodes which are potential targets for the animation.
     */
    parseSkin(skin: any, target: Container3D, nodes: Container3D[]): Skin;
    /**
     * Creates a mesh from the specified primitive.
     * @param primitive The source primitive object.
     */
    parsePrimitive(primitive: any): Mesh3D;
    /**
     * Creates a container or joint from the specified node index.
     * @param node The index of the node.
     */
    parseNode(index: number): Container3D;
    parseModel(): Model;
}
