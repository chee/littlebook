import defaultRepo from ":/core/sync/automerge.ts"
import type {Repo} from "@automerge/automerge-repo"
import {RepoContext} from "solid-automerge"
import {useContext} from "solid-js"

export default function usePerfectRepo(backup?: Repo) {
	return useContext(RepoContext) ?? backup ?? defaultRepo
}
