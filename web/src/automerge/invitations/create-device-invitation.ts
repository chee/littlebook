import type * as Auth from "@localfirst/auth"
import createFriendlyInvitation from "./create-invitation.ts"

export default function createDeviceInvitation(team: Auth.Team) {
	const {seed} = team.inviteDevice()
	return createFriendlyInvitation(team, seed)
}
