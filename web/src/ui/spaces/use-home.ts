import * as local from "../automerge/local.ts"
import {useAutomerge} from "../automerge/use-automerge.ts"
import getDocIdFromTeam from "../../auth/teams/get-doc-id-from-team.ts"
import useDocument from "../documents/use-document.ts"

export function useHomeSpace() {
	const automerge = useAutomerge()
	const shareId = local.state.home
	const spaceId = () =>
		shareId && (getDocIdFromTeam(automerge.auth.getTeam(shareId)) as lb.SpaceId)
	return useDocument<lb.Space>(spaceId)
}
