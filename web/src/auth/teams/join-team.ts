import {parseBasicInvitation} from "../invitations/parse-invitation.ts"
import type {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import type {Repo} from "@automerge/automerge-repo"
import type {BasicInvitation} from "../invitations/invitation-types.ts"

export default async function joinTeamWithCombinedInvitation(
	auth: AuthProvider,
	repo: Repo,
	combinedInvitationCode: string,
) {
	const [userName, invitationCode] = combinedInvitationCode.split(":")

	const {shareId, invitationSeed} = parseBasicInvitation(
		invitationCode as BasicInvitation,
	)
	auth.addInvitation({shareId, invitationSeed, userName})

	return new Promise(yay => {
		auth.once("joined", yay)
	})
}
