export declare class Mat4 {
    static getTranslation(mat: Float32Array, out?: Float32Array): Float32Array;
    static create(): Float32Array;
    static translate(mat: Float32Array, v: Float32Array, out?: Float32Array): Float32Array;
    static getScaling(mat: Float32Array, out?: Float32Array): Float32Array;
    static getRotation(mat: Float32Array, out?: Float32Array): Float32Array;
    static copy(a: Float32Array, out?: Float32Array): Float32Array;
    static fromQuat(q: Float32Array, out?: Float32Array): Float32Array;
    static fromRotationTranslationScale(q: Float32Array, v: Float32Array, s: Float32Array, out?: Float32Array): Float32Array;
    static fromRotation(rad: number, axis: Float32Array, out?: Float32Array): Float32Array;
    static fromScaling(v: Float32Array, out?: Float32Array): Float32Array;
    static fromTranslation(v: Float32Array, out?: Float32Array): Float32Array;
    static multiply(a: Float32Array, b: Float32Array, out?: Float32Array): Float32Array;
    static lookAt(eye: Float32Array, center: Float32Array, up: Float32Array, out?: Float32Array): Float32Array;
    static identity(out?: Float32Array): Float32Array;
    static perspective(fovy: number, aspect: number, near: number, far: number, out?: Float32Array): Float32Array;
    static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number, out?: Float32Array): Float32Array;
    static invert(a: Float32Array, out?: Float32Array): Float32Array;
    static transpose(a: Float32Array, out?: Float32Array): Float32Array;
    static targetTo(eye: Float32Array, target: Float32Array, up: Float32Array, out?: Float32Array): Float32Array;
    static rotateX(a: Float32Array, rad: number, out?: Float32Array): Float32Array;
    static rotateY(a: Float32Array, rad: number, out?: Float32Array): Float32Array;
    static rotateZ(a: Float32Array, rad: number, out?: Float32Array): Float32Array;
    static rotate(a: Float32Array, rad: number, axis: Float32Array, out?: Float32Array): Float32Array;
    static scale(a: Float32Array, v: Float32Array, out?: Float32Array): Float32Array;
}
