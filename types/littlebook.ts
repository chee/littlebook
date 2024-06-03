import type {Branded, Brand} from "./brand.ts"

export const DefaultAreaId = "default-area" as Littlebook.AreaId
export const InboxId = "inbox" as Littlebook.FolderId

export declare namespace Littlebook {
	type ContentId = Branded<string, "content-id">
	type FileId = Branded<string, "file-id">
	type FolderId = Branded<string, "folder-id">
	type ProjectId = Branded<string, "project-id">
	type AreaId = Branded<string, "area-id">
	type WhenId = Branded<string, "when-id">
	type SpaceId = Branded<string, "space-id">
	type DefaultAreaId = typeof DefaultAreaId
	type InboxId = typeof InboxId

	interface Content {
		id: ContentId
		fileId: FileId
		content: Uint8Array
	}

	interface File {
		id: FileId
		parentId: FolderId | ProjectId | AreaId
		contentId: ContentId
		whenId?: WhenId
	}

	interface Folder {
		id: FolderId
		parentId: FolderId | ProjectId | AreaId
		children: (FileId | FolderId)[]
		whenId?: WhenId
	}

	interface Project {
		id: ProjectId
		parentId: AreaId
		children: (FileId | FolderId)[]
		whenId?: WhenId
	}

	interface Area {
		id: AreaId
		children: ProjectId[]
		parentId: SpaceId
	}

	interface When<Target extends {id: Brand<string>}> {
		id: WhenId
		// 2024-02-03 or someday
		when: string
		period?: "morning" | "afternoon" | "evening"
		targetId: Target["id"]
	}

	interface Space {
		id: SpaceId
		inboxId: InboxId
		children: [DefaultAreaId, ...AreaId[]]
		// biome-ignore lint/suspicious/noExplicitAny: this can be any
		whenIds: When<any>[]
	}
}

export declare namespace LittlebookNested {
	type ContentId = Branded<string, "content-id">
	type FileId = Branded<string, "file-id">
	type FolderId = Branded<string, "folder-id">
	type ProjectId = Branded<string, "project-id">
	type AreaId = Branded<string, "area-id">
	type WhenId = Branded<string, "when-id">
	type SpaceId = Branded<string, "space-id">
	type DefaultAreaId = typeof DefaultAreaId
	type InboxId = typeof InboxId

	interface Content {
		id: ContentId
		fileId: FileId
		content: Uint8Array
	}

	interface File {
		id: FileId
		parentId: FolderId | ProjectId | AreaId
		contentId: ContentId
		whenId?: WhenId
	}

	interface Folder {
		id: FolderId
		parentId: FolderId | ProjectId | AreaId
		children: (File | FolderId)[]
		whenId?: WhenId
	}

	interface Project {
		id: ProjectId
		parentId: AreaId
		children: (File | Folder)[]
		// todo ref to when?
		whenId?: WhenId
	}

	interface Area {
		id: AreaId
		children: Project[]
		// todo ref to parent?
		parentId: SpaceId
	}

	interface When<Target extends {id: Brand<string>}> {
		id: WhenId
		// 2024-02-03 or someday
		when: string
		period?: "morning" | "afternoon" | "evening"
		targetId: Target["id"]
	}

	interface Space {
		id: SpaceId
		inboxId: InboxId
		children: Area[]
		// biome-ignore lint/suspicious/noExplicitAny: this can be anywhen
		whens: When<any>[]
	}
}
