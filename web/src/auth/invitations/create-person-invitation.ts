import type * as Auth from "@localfirst/auth"
import createFriendlyInvitation from "./create-invitation.ts"

export default function createPersonInvitation(
	team: Auth.Team,
	{
		maxUses,
		expiration,
	}: {
		expiration?: Auth.UnixTimestamp
		maxUses?: number
	},
) {
	const {seed} = team.inviteMember({maxUses, expiration})
	return createFriendlyInvitation(team, seed)
}