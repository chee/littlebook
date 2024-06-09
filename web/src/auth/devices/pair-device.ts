import type {DeviceWithSecrets, Team, User} from "@localfirst/auth"
import createDevice from "./create-device.ts"
import start from "../../repo/start-repo.ts"
import parseFriendlyInvitation from "../invitations/parse-invitation.ts"
import type {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import type {Repo} from "@automerge/automerge-repo"
import type {FriendlyInvitation} from "../invitations/invitation-types.ts"

export default async function pairDevice({
	userName,
	invitationCode,
}: {
	userName: string
	invitationCode: string
}): Promise<{
	device: DeviceWithSecrets
	user: User
	team: Team
	auth: AuthProvider
	repo: Repo
}> {
	const device = createDevice(userName)
	const {auth, repo} = await start({device})
	const {shareId, invitationSeed} = parseFriendlyInvitation(
		invitationCode as FriendlyInvitation,
	)
	auth.addInvitation({shareId, invitationSeed, userName})

	return new Promise(yay => {
		auth.once("joined", ({team, user}) => {
			device.userId = user.userId
			yay({device, user, team, auth, repo})
		})
	})
}
