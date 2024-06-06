import type {Branded, Brand} from "./brand.ts"

export declare namespace XXX {
	type ContentId = Branded<string, "content-id">
	type FileId = Branded<string, "file-id">
	type FolderId = Branded<string, "folder-id">
	type ProjectId = Branded<string, "project-id">
	type AreaId = Branded<string, "area-id">
	type WhenId = Branded<string, "when-id">
	type SpaceId = Branded<string, "space-id">
	type InboxId = Branded<string, "inbox-id">

	interface Content {
		id: ContentId
		name: string
		ext: string
		bytes: Uint8Array
	}

	interface File {
		id: FileId
		type: "file"
		name: string
		ext: string
		contentId: ContentId
		whenId?: WhenId
		icon?: string
	}

	interface Folder {
		id: FolderId
		type: "folder"
		name: string
		ext: "/"
		children: (FileId | FolderId)[]
		whenId?: WhenId
		icon?: string
	}

	interface Project {
		id: ProjectId
		type: "project"
		name: string
		children: (FileId | FolderId)[]
		whenId?: WhenId
		icon?: string
	}

	interface Area {
		id: AreaId
		type: "area"
		name: string
		children: ProjectId[]
		icon?: string
	}

	interface When<Target extends {id: Brand<string>}> {
		id: WhenId
		type: "when"
		// 2024-02-03 or someday
		when: string
		period?: "morning" | "afternoon" | "evening"
		targetId: Target["id"]
	}

	interface Space {
		id: SpaceId
		type: "space"
		inboxId: InboxId
		children: (ProjectId | AreaId)[]
		whenIds: When<any>[]
	}
}
