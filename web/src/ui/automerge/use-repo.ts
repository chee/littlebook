import {useContext} from "solid-js"
import {AuthContext} from "./auth/auth-provider"

/**
 * A [Solid
 * primitive](https://docs.solidjs.com/guides/state-management#state-management)
 * which returns the Automerge repo from {@link RepoContext}.
 */
export function useRepo() {
	const authContext = useContext(AuthContext)
	const repo = authContext?.repo
	if (!repo) throw new Error("Repo was not found on AuthContext.")
	return repo
}
