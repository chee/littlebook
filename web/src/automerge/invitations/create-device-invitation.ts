import type * as Auth from "@localfirst/auth"
import createInvitation from "./create-invitation.ts"

export default function createDeviceInvitation(team: Auth.Team) {
	const {seed} = team.inviteDevice()
	return createInvitation(team, seed)
}
