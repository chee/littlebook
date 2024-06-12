// todo rewrite useDocument with @preact/signals
import {useDocument} from "@automerge/automerge-repo-react-hooks"

export default function useProject(id: lb.ProjectId) {
	return useDocument<lb.Project>(id)
}
