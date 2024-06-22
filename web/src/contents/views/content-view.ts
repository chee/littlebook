import type {ChangeFn} from "@automerge/automerge"
import type {lb} from "../../types"
import type {DocHandle} from "@automerge/automerge-repo"

export interface EditorViewProps<ContentType extends lb.AnyContent> {
	doc: lb.Content<ContentType>
	change(fn: ChangeFn<lb.Content<ContentType>>): void
	handle: DocHandle<lb.Content<ContentType>>
	value: ContentType
}

export interface PreviewProps<ContentType extends lb.AnyContent> {
	value: ContentType
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
export abstract class EditorViewElement<ContentType extends lb.AnyContent>
	extends HTMLElement
	implements EditorViewProps<ContentType>
{
	doc!: lb.Content<ContentType>
	handle!: DocHandle<lb.Content<ContentType>>
	change(_fn: ChangeFn<lb.Content<ContentType>>) {}
	value!: ContentType
}

export abstract class PreviewElement<ContentType extends lb.AnyContent>
	extends HTMLElement
	implements PreviewProps<ContentType>
{
	abstract value: ContentType
}

export type EditorViewConstructor<ContentType extends lb.AnyContent> =
	(new () => EditorViewElement<ContentType>) &
		typeof EditorViewElement<ContentType> & {
			displayName?: string
			name: string
		}

export type PreviewConstructor<ContentType extends lb.AnyContent> =
	(new () => PreviewElement<ContentType>) &
		typeof PreviewElement<ContentType> & {displayName?: string; name: string}

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

// export type MetadataViewComponent<
// 	T extends lb.AnyContent,
// 	C extends (props: any) => any | {new (props: any): C},
// > = (props: MetadataViewProps<T>) => ReturnType<C>

// export interface MetadataViewElement<ContentType extends lb.AnyContent>
// 	extends CustomElementConstructor,
// 		MetadataViewProps<ContentType> {}

// export type MetadataView<ContentType extends lb.AnyContent> =
// 	| MetadataViewElement<ContentType>
