import type {Repo} from "@automerge/automerge-repo"

export default function createSpace(
	repo: Repo,
	template: Partial<lb.Space> = {},
) {
	const spaceHandle = repo.create<lb.Space>({
		type: "space",
		id: "" as lb.SpaceId,
		name: template.name || "",
		areas: template.areas || [],
		projects: template.projects || [],
	})
	spaceHandle.change(space => {
		// @ts-expect-error
		space.id = spaceHandle.documentId as lb.SpaceId
	})
	return spaceHandle
}
