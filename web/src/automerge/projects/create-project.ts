import type {Repo} from "@automerge/automerge-repo"
import random from "random"

// todo this thing where i set the id with a @ts-expect-error should be wrapped
// up into a single `create<T extends AnyDocument>(type: T['type'], template:
// Omit<T, "id" | "type">)` thing, which i can use in these files instead of
// doing this every time.
export default function createProject(
	repo: Repo,
	template: Partial<lb.Project> = {},
) {
	const projectHandle = repo.create<lb.Project>({
		id: "" as lb.ProjectId,
		type: "project",
		children: template.children || [],
		icon: template.icon || random.choice(["🦔", "🍒", "🧀", "✨", "👽"]),
		name: template.name || "",
	})
	projectHandle.change(project => {
		// @ts-expect-error this is read-only, but we need to write it here
		project.id = projectHandle.documentId as lb.ProjectId
	})
	return projectHandle
}
