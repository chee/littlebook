import type {DocumentId} from "@automerge/automerge-repo"
import type * as Auth from "@localfirst/auth"
import type {lb} from "../../types.ts"

export default function getDocIdFromTeam(team: Auth.Team): lb.SpaceId {
	const spaceId = team
		.messages<{type: "space-id"; payload: DocumentId}>()
		.filter(message => message.type === "space-id")
		.pop()?.payload
	if (!spaceId) {
		throw new Error(`no space-id found on ${team.teamName} of ${team.userName}`)
	}
	return spaceId as lb.SpaceId
}
