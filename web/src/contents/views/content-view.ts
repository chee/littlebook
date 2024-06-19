import type {ChangeFn} from "@automerge/automerge"
import type {lb} from "../../types"
import type {ContentViewName} from "../types/type-registries"

export interface EditorViewProps<ContentType extends lb.AnyContent> {
	content: ContentType
	// todo make it possible to have the change function only have access to .value.
	//
	// right now it isn't possible because you wouldn't be able to use the automerge
	// `updateText` feature. but i could provide a way to do that
	changeContent(fn: (content: lb.Content<ContentType>) => void): void
}

export interface PreviewProps<ContentType extends lb.AnyContent> {
	content: ContentType
}

export interface SelfRegisteringContentView<ContentType extends lb.AnyContent> {
	define(name: ContentViewName<SelfRegisteringContentView<ContentType>>): void
}

// todo are these useful?
export type EditorViewComponent<
	T extends lb.AnyContent,
	C extends (props: any) => any | {new (props: any): C},
> = (props: EditorViewProps<T>) => ReturnType<C>

export type PreviewComponent<
	T extends lb.AnyContent,
	C extends (props: any) => any | {new (props: any): C},
> = (props: PreviewProps<T>) => ReturnType<C>

// todo rethink all of this
// todo make more webby with events
export abstract class EditorViewElement<
	ContentType extends lb.AnyContent,
> extends HTMLElement {
	abstract content: ContentType
	changeContent(_fn: ChangeFn<lb.Content<ContentType>>) {}
}

export abstract class PreviewElement<
	ContentType extends lb.AnyContent,
> extends HTMLElement {
	abstract content: ContentType
}

export type EditorView<ContentType extends lb.AnyContent> =
	| SelfRegisteringContentView<ContentType>
	| ((new () => EditorViewElement<ContentType>) &
			typeof EditorViewElement<ContentType>)

export type Preview<ContentType extends lb.AnyContent> =
	| SelfRegisteringContentView<ContentType>
	| ((new () => PreviewElement<ContentType>) &
			typeof PreviewElement<ContentType>)

// todo store metadata in a different automerge doc
// export interface MetadataViewProps<ContentType extends lb.AnyContent> {
// 	metadata(): lb.Content<ContentType>
// 	changeMetadata(fn: (content: lb.Content<ContentType>) => void): void
// }

// const placeholderContent: lb.Content<any> = {
// 	id: "__placeholder" as lb.ContentId,
// 	type: "content",
// 	contentType: "public.data" as lb.UniformTypeIdentifier,
// 	value: null,
// 	metadata: {},
// }

// export const metadataViewPlaceholderProps: MetadataViewProps<any> = {
// 	metadata: () => new Uint8Array(),
// 	changeMetadata() {},
// }

// export interface SelfRegisteringMetadataView<
// 	ContentType extends lb.AnyContent,
// > {
// 	define(
// 		name: ContentViewName<SelfRegisteringMetadataView<ContentType>>,
// 		placeholderProps: MetadataViewProps<ContentType>,
// 	): void
// }

// export interface SelfRegisteringPreview<ContentType extends lb.AnyContent> {
// 	define(name: ContentViewName<SelfRegisteringPreview<ContentType>>): void
// }

// export type MetadataViewComponent<
// 	T extends lb.AnyContent,
// 	C extends (props: any) => any | {new (props: any): C},
// > = (props: MetadataViewProps<T>) => ReturnType<C>

// export interface MetadataViewElement<ContentType extends lb.AnyContent>
// 	extends CustomElementConstructor,
// 		MetadataViewProps<ContentType> {}

// export type MetadataView<ContentType extends lb.AnyContent> =
// 	| SelfRegisteringMetadataView<ContentType>
// 	| MetadataViewElement<ContentType>
