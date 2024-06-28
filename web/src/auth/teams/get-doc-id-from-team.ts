import type {DocumentId} from "@automerge/automerge-repo"
import type * as Auth from "@localfirst/auth"

export default function getDocIdFromTeam(team: Auth.Team): DocumentId {
	const docId = team
		.messages<{type: "doc-id"; payload: DocumentId}>()
		.filter(message => message.type === "doc-id")
		.pop()?.payload
	if (!docId) {
		throw new Error(`no doc-id found on ${team.teamName} of ${team.userName}`)
	}
	return docId
}
