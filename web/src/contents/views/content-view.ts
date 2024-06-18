import type {ChangeFn} from "@automerge/automerge-repo"
import type {ContentViewName} from "../types/type-registries"
import type {lb} from "../../types"

export interface ContentViewProps<ContentType extends lb.AnyContent> {
	file: lb.File
	changeFile(fn: ChangeFn<lb.File>): void
	content: lb.Content<ContentType>
	changeContent(fn: ChangeFn<lb.Content<ContentType>>): void
}

export interface SelfRegisteringContentView<ContentType extends lb.AnyContent> {
	define(name: ContentViewName<SelfRegisteringContentView<ContentType>>): void
}

export type ContentViewComponent<
	T extends lb.AnyContent,
	C extends (props: any) => any,
> = (props: ContentViewProps<T>) => ReturnType<C>

// todo rethink all of this
// todo provide a class to inherit from
// todo make more webby with events
export interface ContentViewElement<ContentType extends lb.AnyContent>
	extends HTMLElement {
	file: lb.File
	content: lb.Content<ContentType>
	changeFile(fn: ChangeFn<lb.File>): void
	changeContent(fn: ChangeFn<ContentType>): void
}

export interface ContentMetadataViewElement<ContentType extends lb.AnyContent>
	extends ContentViewElement<ContentType> {}
export interface ContentPreviewElement<ContentType extends lb.AnyContent>
	extends ContentViewElement<ContentType> {}

export type ContentView<ContentType extends lb.AnyContent> =
	| SelfRegisteringContentView<ContentType>
	| {new (...args: any[]): ContentViewElement<ContentType>}

export type ContentMetadataView<ContentType extends lb.AnyContent> =
	| SelfRegisteringContentView<ContentType>
	| {new (...args: any[]): ContentViewElement<ContentType>}

export type ContentPreview<ContentType extends lb.AnyContent> =
	| SelfRegisteringContentView<ContentType>
	| {new (...args: any[]): ContentViewElement<ContentType>}
