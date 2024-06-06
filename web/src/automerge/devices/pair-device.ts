import type {DeviceWithSecrets, Team, User} from "@localfirst/auth"
import createDevice from "./create-device.ts"
import createRepo from "../repo/create-repo.ts"
import {parseInvitation} from "../invitations.ts"
import type {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import type {Repo} from "@automerge/automerge-repo"

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
	const {auth, repo} = await createRepo({device})
	const {shareId, invitationSeed} = parseInvitation(invitationCode)
	auth.addInvitation({shareId, invitationSeed, userName})

	return new Promise(yay => {
		auth.once("joined", ({team, user}) => {
			device.userId = user.userId
			yay({device, user, team, auth, repo})
		})
	})
}
