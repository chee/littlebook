declare const __brand: unique symbol
type Brand<B> = {[__brand]: B}
type Branded<T, B> = T & Brand<B>
import type {DocumentId} from "@automerge/automerge-repo"
import type {AutomergeValue} from "@automerge/automerge/next"
import type * as Auth from "@localfirst/auth"
import type {
	AuthProvider,
	ShareId,
} from "@localfirst/auth-provider-automerge-repo"
import type createLittlebookAPI from "./api/create-littlebook-api.ts"

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
	type FolderId = Branded<DocumentId, "folder-id">
	type ProjectId = Branded<DocumentId, "project-id">
	type AreaId = Branded<DocumentId, "area-id">
	type WhenId = Branded<DocumentId, "when-id">
	type SpaceId = Branded<DocumentId, "space-id">
	type InboxId = Branded<DocumentId, "inbox-id">
	type UniformTypeIdentifier = Branded<DocumentId, "uniform-type-identifier">
	interface UniformType {
		name: UniformTypeIdentifier
		conformsTo?: UniformTypeIdentifier[]
		mimeType?: string
		fileNameExtension?: string
	}

	type API = ReturnType<typeof createLittlebookAPI>

	type When = Date | "someday"

	type AnyContent = AutomergeValue

	type AnyDocument =
		| Space
		| Area
		| Project
		| Folder
		| File
		| Content<AnyContent>

	type NamedDocument = Space | Area | Project | Folder | File

	interface Space {
		readonly type: "space"
		readonly id: SpaceId
		name: string
		projects: AutomergeList<ProjectId>
		areas: AutomergeList<AreaId>
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
		items: AutomergeList<FolderId | FileId>
		icon: string
		when?: Date
	}

	type ProjectItemId = Project["items"][number]

	interface Folder {
		readonly type: "folder"
		readonly id: FolderId
		name: string
		// readonly parentId: ProjectId | FolderId
		items: AutomergeList<FolderId | FileId>
		icon: string
		when?: Date
	}

	type FolderItem = Folder["items"][number]
	interface Package extends Folder {
		ext: string
	}

	interface File {
		readonly type: "file"
		readonly id: FileId
		name: string
		note: string
		when?: When
		content: ContentId
		lastModified?: number
	}

	// todo is metadata kept inside `value` or in a separate property?
	// say exif data for an image, or the character set for a textfile?
	// those are different, i guess. the exif data is inside the file type while
	// the character set of a text file is external
	interface Content<ContentType extends AnyContent> {
		readonly id: ContentId
		readonly type: "content"
		readonly contentType: UniformTypeIdentifier
		value: ContentType
		metadata?: AutomergeValue
	}

	type UserInfo = {
		device: Auth.DeviceWithSecrets
		user: Auth.UserWithSecrets
		team: Auth.Team
		auth: AuthProvider
	}

	type LocalState = {
		userName?: string
		device?: Auth.DeviceWithSecrets
		user?: Auth.UserWithSecrets
		shareId?: ShareId
		spaceId?: lb.SpaceId
	}

	interface Store<DataType> {
		sub(listener: () => void): () => void
		get(): DataType
		set(local: DataType): void
	}
}
