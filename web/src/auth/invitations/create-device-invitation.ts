import type * as Auth from "@localfirst/auth"
import {createBasicInvitation} from "./create-invitation.ts"

export default function createDeviceInvitation(team: Auth.Team) {
	const {seed} = team.inviteDevice()
	return createBasicInvitation(team, seed)
}

export function createCombinedDeviceInvitation(
	user: Auth.User,
	team: Auth.Team,
) {
	const invitation = createDeviceInvitation(team)
	return `${user.userName}:${user.userId}:${invitation}`
}
