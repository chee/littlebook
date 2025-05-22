type MaybeNamedShape<Shape> = [shape: Shape] | [shape: Shape, {
    name: string;
}];
export type MaybePromise<T> = T | Promise<T>;
interface SourceBase {
    id: string;
    displayName: string;
    category: string;
}
export interface CreateSource<Shape = unknown> extends SourceBase {
    category: "new";
    "new"(): MaybePromise<MaybeNamedShape<Shape>>;
}
export interface FilesystemSource<Shape = unknown> extends SourceBase {
    category: "filesystem";
    import(file: File): MaybePromise<MaybeNamedShape<Shape>>;
    patterns?: string[];
    mimes?: string[];
}
export type Source<Shape = unknown> = CreateSource<Shape> | FilesystemSource<Shape>;
export {};
