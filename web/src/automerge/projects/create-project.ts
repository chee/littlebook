import {RawString, type Repo} from "@automerge/automerge-repo"
import type {lb} from "../../types.ts"

export default function createProject(
	repo: Repo,
	template: Partial<lb.Project> = {},
) {
	return repo.create<lb.Project>({
		type: "project",
		children: template.children || [],
		icon: template.icon || "",
		name: template.name || new RawString(""),
	})
}
