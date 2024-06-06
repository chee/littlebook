import {RawString, type Repo} from "@automerge/automerge-repo"
import type {lb} from "../../types.ts"

export default function createSpace(
	repo: Repo,
	template: Partial<lb.Space> = {},
) {
	return repo.create<lb.Space>({
		type: "space",
		name: template.name || new RawString(""),
		children: template.children || [],
	})
}
