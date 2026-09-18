import { TransformId } from "./transform-id";
export declare class MatrixComponent<T> {
    private _parent;
    private _data;
    private _update;
    private _id?;
    constructor(_parent: TransformId, _data: T, _update: (data: T) => void);
    get data(): T;
}
