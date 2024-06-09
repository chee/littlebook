import type {DocumentId} from "@automerge/automerge-repo"
import type * as Auth from "@localfirst/auth"

export default function storeDocIdOnTeam(team: Auth.Team, id: DocumentId) {
	team.addMessage({type: "space-id", payload: id})
}
