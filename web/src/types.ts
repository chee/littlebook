declare const __brand: unique symbol
type Brand<B> = {[__brand]: B}
type Branded<T, B> = T & Brand<B>
import type {
	DocHandleChangePayload,
	DocumentId,
	Repo,
} from "@automerge/automerge-repo"
import type {AutomergeValue, ScalarValue} from "@automerge/automerge/next"
import type * as Auth from "@localfirst/auth"
import type {
	AuthProvider,
	ShareId,
} from "@localfirst/auth-provider-automerge-repo"
import type createLittlebookAPI from "./api/api.ts"
import type {ParentComponent} from "solid-js"
import type {
	LooseUniformTypeDescriptor,
	UniformTypeIdentifier,
} from "./contents/uniform-type.ts"
import type {AnyContentValue} from "./global"

export declare type ParentComponentProps<T = Record<any, any>> = Parameters<
	ParentComponent<T>
>[0]

/** Inside an Automerge change function, any arrays found on the document have these utility functions */
export declare interface AutomergeList<T> extends Array<T> {
	insertAt(index: number, ...args: T[]): AutomergeList<T>
	deleteAt(index: number, numDelete?: number): AutomergeList<T>
}

export declare type ContentHandleChangePayload<T extends AnyContentValue> =
	DocHandleChangePayload<lb.Content<T>>

export type WithoutId<DocType extends {id: any}> = Omit<DocType, "id">

export type WithReadonly<Type, Key extends keyof Type> = Omit<Type, Key> &
	Readonly<Pick<Type, Key>>

export declare namespace lb {
	type ContentId = Branded<DocumentId, "content-id">
	type SpaceId = Branded<DocumentId, "space-id">
	type FolderId = Branded<DocumentId, "folder-id">
	type FileId = Branded<DocumentId, "file-id">
	type ItemId = FolderId | FileId
	type InboxId = Branded<DocumentId, "inbox-id">

	type API = ReturnType<typeof createLittlebookAPI>

	type When = Date | "someday"

	type AnyContentValue =
		| ScalarValue
		| Record<string, AutomergeValue>
		| Array<AutomergeValue>

	type AnyDocument = Space | Folder | File

	type AnyParentDocument = Space | Directory

	type NamedDocument = Space | Folder | File

	interface Space {
		readonly type: "space"
		readonly id: SpaceId
		name: string
		items: AutomergeList<FolderId>
	}

	interface Directory {
		readonly type: "folder"
		readonly id: FolderId
		name: string
		items: AutomergeList<FolderId | FileId>
		note: string
		icon?: string
		when?: When
		contentType?: UniformTypeIdentifier
	}

	interface Folder extends Omit<Directory, "contentType"> {}
	interface Package extends Directory {
		contentType: UniformTypeIdentifier
	}

	// todo is it interesting that this is so like a folder?
	interface File {
		readonly type: "file"
		readonly id: FileId
		// todo
		name: string
		note: string
		when?: When
		contentType: UniformTypeIdentifier
		icon?: string
		content: ContentId
		lastModified?: number
		// a url?
		source?: string
	}

	type Item = File | Folder | Package

	interface Content<ContentType extends AnyContentValue> {
		value: ContentType
	}

	type AutomergeState = {
		repo: Repo
		auth: AuthProvider
		user: Auth.UserWithSecrets
		device: Auth.DeviceWithSecrets
		team: Auth.Team
	}

	type ContentCoder<Model extends AnyContentValue> =
		import("./contents/coders.ts").ContentCoder<Model>
	type ContentEditorView<Model extends AnyContentValue> =
		import("./contents/content-view.ts").EditorViewConstructor<Model>
	// type ContentMetadataView<Model extends AnyContent> =
	// 	import("./contents/views/content-view.ts").MetadataView<Model>
	type ContentPreview<Model extends AnyContentValue> =
		import("./contents/content-view.ts").PreviewConstructor<Model>

	type AnyContentView<Model extends AnyContentValue> =
		| ContentEditorView<Model>
		// | ContentMetadataView<Model>
		| ContentPreview<Model>

	type ContentEditorViewProps<Model extends AnyContentValue> =
		import("./contents/content-view.ts").EditorViewProps<Model>

	// type ContentMetadataViewProps<Model extends AnyContent> =
	// 	import("./contents/views/content-view.ts").MetadataViewProps<Model>

	type ContentPreviewProps<Model extends AnyContentValue> =
		import("./contents/content-view.ts").PreviewProps<Model>

	namespace plugins {
		type API = typeof import("./plugins/plugin-api.ts")

		interface ContentType<T extends lb.AnyContentValue> {
			types: (UniformTypeIdentifier | LooseUniformTypeDescriptor)[]
			coder?: lb.ContentCoder<T>
			views?: {
				editor?: ContentEditorView<T>
				preview?: ContentPreview<T>
				// metadata?: ContentMetadataView<T>
			}
		}
	}
}
