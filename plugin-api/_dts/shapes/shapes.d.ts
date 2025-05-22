import * as v from "valibot";
export declare const TextShape: v.ObjectSchema<{
    readonly text: v.StringSchema<undefined>;
}, undefined>;
export type TextShape = v.InferOutput<typeof TextShape>;
export declare const CodeShape: v.ObjectSchema<{
    readonly text: v.StringSchema<undefined>;
    readonly language: v.OptionalSchema<v.StringSchema<undefined>, undefined>;
}, undefined>;
export type CodeShape = v.InferOutput<typeof CodeShape>;
export declare const MarkdownShape: v.ObjectSchema<{
    readonly text: v.StringSchema<undefined>;
    readonly language: v.LiteralSchema<"markdown", undefined>;
}, undefined>;
export type MarkdownShape = v.InferOutput<typeof MarkdownShape>;
export declare const JavaScriptEditorShape: v.ObjectSchema<{
    readonly text: v.StringSchema<undefined>;
    readonly language: v.LiteralSchema<"javascript", undefined>;
    readonly editorURL: v.OptionalSchema<v.CustomSchema<import("@automerge/vanillajs").AutomergeUrl, undefined>, undefined>;
}, undefined>;
export type JavaScriptEditorShape = v.InferOutput<typeof JavaScriptEditorShape>;
export declare const TypeScriptEditorShape: v.ObjectSchema<{
    readonly text: v.StringSchema<undefined>;
    readonly language: v.LiteralSchema<"typescript", undefined>;
    readonly editorURL: v.OptionalSchema<v.CustomSchema<import("@automerge/vanillajs").AutomergeUrl, undefined>, undefined>;
}, undefined>;
export type TypeScriptEditorShape = v.InferOutput<typeof TypeScriptEditorShape>;
export declare const FolderShape: v.ObjectSchema<{
    readonly files: v.ArraySchema<v.StringSchema<undefined>, undefined>;
}, undefined>;
export type FolderShape = v.InferOutput<typeof FolderShape>;
