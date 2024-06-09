import type {AutomergeValue} from "@automerge/automerge/next"
import {h, type Component, type FunctionalComponent} from "preact"

// todo should these all be dealing with a lb.Content instead?
export type ChangeFunction<ContentType extends AnyContent> = (
	value: ContentType,
) => void

// todo media views somehow need to be able to surface a `moment` when it's requested,
// so a backlink can be added to the Notes/Margin panel
// useImperativeHandle? or some kind of hook idk
export interface ContentViewProps<ContentType extends AnyContent> {
	content: Readonly<ContentType>
	changeContent: ChangeFunction<ContentType>
}

// todo later i'll let this be a extends HTMLElement with a static tagName
// (satisfies check or runtime check) as long as it can take a `.content`
// property. it'll announce `contentchange`.
export type ContentView<ContentType extends AnyContent> =
	| FunctionalComponent<ContentViewProps<ContentType>>
	| Component<ContentViewProps<ContentType>>

// todo honestly this fromBytes and toBytes stuff would be a great use for Effect
export interface ContentCreator<ContentType extends ContentValue> {
	//example: app.littlebook.text
	readonly type: lb.ContentTypeId
	create(): Content<ContentType>
	fromBytes(bytes: Uint8Array): Content<ContentType>
}

export interface ContentType<Value extends AnyContent> {
	readonly identifier: lb.ContentTypeId
	model: Value
	view: ContentView<Value>
}

export type ContentCreatorCallback<ContentType extends AnyContent> =
	() => ContentCreator<ContentType>

export interface Content<ContentType extends AnyContent> {
	readonly type: lb.ContentTypeId
	ready: boolean
	value: Readonly<ContentType>
	change(fn: (value: ContentType) => void): void
	toBytes(): Uint8Array
}
