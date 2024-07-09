declare const __brand: unique symbol
type Brand<B> = {[__brand]: B}
type Branded<T, B> = T & Brand<B>
import type {
	DocHandleChangePayload,
	DocumentId,
	Repo,
} from "@automerge/automerge-repo"
import type {AutomergeValue, ScalarValue} from "@automerge/automerge/next"

import type {ParentComponent} from "solid-js"
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
	type PackageId = Branded<DocumentId, "package-id">
	type ItemId = FolderId | FileId | PackageId
	type InboxId = Branded<DocumentId, "inbox-id">

	type When = Date | "someday"

	type AnyContentValue =
		| ScalarValue
		| Record<string, AutomergeValue>
		| Array<AutomergeValue>

	type AnyDocument = Space | Package | Folder | File
	type Item = File | Folder | Package

	type AnyParentDocument = Space | Package | Folder

	type NamedDocument = Space | Package | Folder | File

	interface Space {
		readonly type: "space"
		readonly id: SpaceId
		name: string
		items: AutomergeList<FolderId>
	}

	interface Directory {
		readonly type: "folder" | "package"
		readonly id: FolderId | PackageId
		name: string
		items: AutomergeList<FolderId | FileId | PackageId>
		note: string
		icon?: string
		when?: When
		contentType?: UniformTypeIdentifier
	}

	interface Folder extends Omit<Directory, "contentType"> {
		readonly type: "folder"
		readonly id: FolderId
	}
	interface Package extends Directory {
		readonly type: "package"
		readonly id: PackageId
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
		contentTypeConformingTo?: UniformTypeIdentifier[]
		icon?: string
		content: ContentId
		lastModified?: number
		// a url?
		source?: string
	}

	interface Content<ContentType extends AnyContentValue> {
		value: ContentType
	}

	type AutomergeState = {
		repo: Repo
		home: SpaceId
	}

	type ContentCoder<Model extends AnyContentValue> =
		import("./files/contents/content-coders.ts").ContentCoder<Model>

	type ContentViewProps<Model extends AnyContentValue> =
		import("./files/contents/content-view.ts").ContentViewProps<Model>

	type FilenameExtension =
		import("./files/contents/uniform-type.ts").FilenameExtension
	type MIMEType = import("./files/contents/uniform-type.ts").MIMEType
	type UniformTypeIdentifier =
		import("./files/contents/uniform-type.ts").UniformTypeIdentifier

	namespace plugins {
		type API = typeof import("./plugins/plugin-api.ts")
		type activate = (lb: API) => () => void

		interface Manifest {
			/**
			 * if you declare this in the manifest, you need to
			 * registerContentView with an element in the activate
			 * hook
			 */
			contentViews?: {
				identifier: string
				contentTypes: string[]
			}[]
			/**
			 * if you declare this in the manifest, you need to
			 * registerContentCoder with a coder in the activate hook
			 */
			contentTypes?: {
				identifier: string
				description?: string
				conformingTo?: string[]
				filenameExtensions?: string[]
				mimeTypes?: string[]
				icon?: string
			}[]
		}
	}
}
