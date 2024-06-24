declare const __brand: unique symbol
type Brand<B> = {[__brand]: B}
type Branded<T, B> = T & Brand<B>
import type {DocumentId, Repo} from "@automerge/automerge-repo"
import type {AutomergeValue} from "@automerge/automerge/next"
import type * as Auth from "@localfirst/auth"
import type {
	AuthProvider,
	ShareId,
} from "@localfirst/auth-provider-automerge-repo"
import type createLittlebookAPI from "./api/api.ts"
import type {ParentComponent} from "solid-js"
import type {
	LooseUniformTypeDescriptor,
	UniformType,
	UniformTypeDescriptor,
	UniformTypeIdentifier,
} from "./contents/uniform-type.ts"

export declare type ParentComponentProps<T = Record<any, any>> = Parameters<
	ParentComponent<T>
>[0]

/** Inside an Automerge change function, any arrays found on the document have these utility functions */
export declare interface AutomergeList<T> extends Array<T> {
	insertAt(index: number, ...args: T[]): AutomergeList<T>
	deleteAt(index: number, numDelete?: number): AutomergeList<T>
}

export type WithoutId<DocType extends {id: any}> = Omit<DocType, "id">

export type WithReadonly<Type, Key extends keyof Type> = Omit<Type, Key> &
	Readonly<Pick<Type, Key>>

export declare namespace lb {
	type ContentId = Branded<DocumentId, "content-id">
	type FileId = Branded<DocumentId, "file-id">
	type DirectoryId = Branded<DocumentId, "folder-id">
	type ProjectId = Branded<DocumentId, "project-id">
	type AreaId = Branded<DocumentId, "area-id">
	type WhenId = Branded<DocumentId, "when-id">
	type SpaceId = Branded<DocumentId, "space-id">
	type InboxId = Branded<DocumentId, "inbox-id">

	type FolderTypeIdentifier = Branded<
		"public.folder",
		"uniform-type-identifier"
	>
	type ContentCoder<Model extends AnyContent> =
		import("./contents/coders.ts").ContentCoder<Model>
	type ContentEditorView<Model extends AnyContent> =
		import("./contents/content-view.ts").EditorViewConstructor<Model>
	// type ContentMetadataView<Model extends AnyContent> =
	// 	import("./contents/views/content-view.ts").MetadataView<Model>
	type ContentPreview<Model extends AnyContent> =
		import("./contents/content-view.ts").PreviewConstructor<Model>

	type AnyContentView<Model extends AnyContent> =
		| ContentEditorView<Model>
		// | ContentMetadataView<Model>
		| ContentPreview<Model>

	type ContentEditorViewProps<Model extends AnyContent> =
		import("./contents/content-view.ts").EditorViewProps<Model>

	// type ContentMetadataViewProps<Model extends AnyContent> =
	// 	import("./contents/views/content-view.ts").MetadataViewProps<Model>

	type ContentPreviewProps<Model extends AnyContent> =
		import("./contents/content-view.ts").PreviewProps<Model>

	namespace plugins {
		type API = typeof import("./plugins/plugin-api.ts")

		interface ContentType<T extends lb.AnyContent> {
			types: (UniformTypeIdentifier | LooseUniformTypeDescriptor)[]
			coder?: lb.ContentCoder<T>
			views?: {
				editor?: ContentEditorView<T>
				preview?: ContentPreview<T>
				// metadata?: ContentMetadataView<T>
			}
		}
	}

	type API = ReturnType<typeof createLittlebookAPI>

	type When = Date | "someday"

	type AnyContent = AutomergeValue

	type AnyDocument = Space | Area | Project | Folder | File

	type NamedDocument = Space | Area | Project | Folder | File

	interface Space {
		readonly type: "space"
		readonly id: SpaceId
		name: string
		projects: AutomergeList<ProjectId>
		areas: AutomergeList<AreaId>
	}

	interface HomeSpace extends Space {
		home: true
		teams: AutomergeList<Auth.Team>
	}

	interface Area {
		readonly type: "area"
		readonly id: AreaId
		// readonly parentId: SpaceId
		name: string
		projects: AutomergeList<ProjectId>
	}

	interface Project {
		readonly type: "project"
		readonly id: ProjectId
		name: string
		// readonly parentId: AreaId | SpaceId
		items: AutomergeList<DirectoryId | FileId>
		icon: string
		when?: Date
	}

	type ProjectItemId = Project["items"][number]

	interface Directory {
		readonly type: "folder" | "package"
		readonly id: DirectoryId
		name: string
		// readonly parentId: ProjectId | FolderId
		items: AutomergeList<DirectoryId | FileId>
		icon: string
		when?: Date
	}

	interface Folder extends Directory {
		readonly type: "folder"
		contentType: FolderTypeIdentifier
	}

	type FolderItem = Folder["items"][number]
	interface Package extends Directory {
		readonly type: "package"
		contentType: UniformTypeIdentifier
	}

	interface File {
		readonly type: "file"
		readonly id: FileId
		// todo
		contentType: UniformTypeIdentifier
		name: string
		note: string
		when?: When
		content: ContentId
		lastModified?: number
	}

	interface Content<ContentType extends AnyContent> {
		value: ContentType
	}

	type AutomergeState = {
		repo: Repo
		auth: AuthProvider
		user: Auth.UserWithSecrets
		device: Auth.DeviceWithSecrets
		team: Auth.Team
		shareId: ShareId
	}

	type LocalAutomergeState = {
		// when they've chosen a name but not yet created a user?
		// maybe this should just be in memory
		username?: string
		device?: Auth.DeviceWithSecrets
		user?: Auth.UserWithSecrets
		homeShareId?: ShareId
	}
}
