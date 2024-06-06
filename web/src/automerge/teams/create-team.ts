import * as Auth from "@localfirst/auth"
import createDevice from "../devices/create-device.ts"
import storeDocIdOnTeam from "./store-doc-id-on-team.ts"
import type {lb} from "../../types.ts"
import createRepo from "../repo/create-repo.ts"
import createSpace from "../spaces/create-space.ts"
interface CreateTeamOptions {
	teamName: string
	userName: string
	deviceName?: string
}

export default async function createTeam({
	teamName,
	userName,
	deviceName,
}: CreateTeamOptions) {
	const user = Auth.createUser(userName) as Auth.UserWithSecrets
	const device = createDevice(user.userId, deviceName)
	const {auth, repo} = await createRepo({user, device})
	const team = await auth.createTeam(teamName)
	const space = createSpace(repo)
	storeDocIdOnTeam(team, space.documentId)
	return {device, user, team, auth, repo}
}

export async function createDefaultTeam({
	userName,
}: Omit<CreateTeamOptions, "teamName" | "deviceName">) {
	return createTeam({userName, teamName: userName})
}
