import type {Repo} from "@automerge/automerge-repo"
import type {WithoutId} from "../types.ts"
import {Space} from "./space-model.ts"
import createSpaceHandle from "./space-handle.ts"

export default function createSpacesAPI(repo: Repo) {
	return {
		create(doc: Partial<WithoutId<lb.Space>>) {
			return new Space(createSpaceHandle(repo, doc))
		},
		get(id: lb.SpaceId) {
			return new Space(repo.find<lb.Space>(id))
		},
	}
}
