import type {ChangeFn} from "@automerge/automerge-repo"

import type {ComponentType} from "component-register"

export interface ContentViewProps<ContentType extends lb.AnyContent> {
	file: lb.File
	changeFile(fn: ChangeFn<lb.File>): void
	content: lb.Content<ContentType>
	changeContent(fn: ChangeFn<lb.Content<ContentType>>): void
}

export type ContentViewComponentRegisterElement<
	ContentType extends lb.AnyContent,
> = ComponentType<ContentViewProps<ContentType>>

export type ContentMetadataViewComponentRegisterElement<
	ContentType extends lb.AnyContent,
> = ContentViewComponentRegisterElement<ContentType>

export type ContentPreviewComponentRegisterElement<
	ContentType extends lb.AnyContent,
> = ContentViewComponentRegisterElement<ContentType>

export interface ContentViewCustomElement<ContentType extends lb.AnyContent>
	extends HTMLElement {
	file: lb.File
	content: lb.Content<ContentType>
}

export abstract class ContentViewElement<
	ContentType extends lb.AnyContent,
> extends HTMLElement {
	abstract readonly file: lb.File
	abstract readonly content: lb.Content<ContentType>
	changeFile(fn: ChangeFn<lb.File>): void {
		this.dispatchEvent(
			new CustomEvent("filechange", {
				detail: fn,
			}),
		)
	}
	changeContent(fn: ChangeFn<ContentType>) {
		this.dispatchEvent(
			new CustomEvent("contentchange", {
				detail: fn,
			}),
		)
	}
}

export abstract class ContentMetadataViewElement<
	ContentType extends lb.AnyContent,
> extends ContentViewElement<ContentType> {}
export abstract class ContentPreviewElement<
	ContentType extends lb.AnyContent,
> extends ContentViewElement<ContentType> {}

export type ContentView<ContentType extends lb.AnyContent> =
	| ContentViewComponentRegisterElement<ContentType>
	| ContentViewElement<ContentType>

export type ContentMetadataView<ContentType extends lb.AnyContent> =
	| ContentViewComponentRegisterElement<ContentType>
	| ContentViewElement<ContentType>

export type ContentPreview<ContentType extends lb.AnyContent> =
	| ContentViewComponentRegisterElement<ContentType>
	| ContentViewElement<ContentType>
