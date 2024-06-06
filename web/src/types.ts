declare const __brand: unique symbol
type Brand<B> = {[__brand]: B}
type Branded<T, B> = T & Brand<B>
import type {DocumentId, RawString} from "@automerge/automerge-repo"
import type {AutomergeValue} from "@automerge/automerge/next"
import type * as Auth from "@localfirst/auth"
import type {
	AuthProvider,
	ShareId,
} from "@localfirst/auth-provider-automerge-repo"

/** Inside an Automerge change function, any arrays found on the document have these utility functions */
export interface ExtendedArray<T> extends Array<T> {
	insertAt(index: number, ...args: T[]): ExtendedArray<T>
	deleteAt(index: number, numDelete?: number): ExtendedArray<T>
}

export declare namespace lb {
	type ContentId = Branded<DocumentId, "content-id">
	type FileId = Branded<DocumentId, "file-id">
	type FolderId = Branded<DocumentId, "folder-id">
	type ProjectId = Branded<DocumentId, "project-id">
	type AreaId = Branded<DocumentId, "area-id">
	type WhenId = Branded<DocumentId, "when-id">
	type SpaceId = Branded<DocumentId, "space-id">
	type InboxId = Branded<DocumentId, "inbox-id">

	type When = Date | "someday"

	type AnyDocument = Space | Area | Project | Folder | File

	interface Space {
		readonly type: "space"
		readonly id: SpaceId
		name: string
		projects: ProjectId[]
		areas: AreaId[]
	}

	interface Area {
		readonly type: "area"
		readonly id: AreaId
		// readonly parentId: SpaceId
		name: string
		children: ProjectId[]
	}

	interface Project {
		readonly type: "project"
		readonly id: ProjectId
		name: string
		// readonly parentId: AreaId | SpaceId
		children: (FolderId | FileId)[]
		icon: string
		when?: Date
	}

	interface Folder {
		readonly type: "folder"
		readonly id: FolderId
		name: string
		// readonly parentId: ProjectId | FolderId
		children: (FolderId | FileId)[]
		icon: string
		when?: Date
	}
	interface Package extends Folder {
		ext: string
	}

	// todo still haven't figured this out.
	// i guess things can extend this
	// i should just focus on making a collaborative text file
	// and not worrying about the types. i should maybe disable red wiggly lines
	// so they aren't distating me
	interface File {
		readonly type: "file"
		readonly id: FileId
		// readonly parentId: ProjectId | FolderId
		name: string
		ext: string
		content?: ContentId
		data?: any
		when?: When
		annotation: string
	}

	interface Content<BodyType extends AutomergeValue> {
		readonly id: ContentId
		body: BodyType
	}

	type UnknownContent = Content<Uint8Array>
	type TextContent = Content<string>
	type BinaryContent = Content<Uint8Array>

	// interface When {
	// 	when: string
	// 	period?: "morning" | "afternoon" | "evening"
	// }

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
