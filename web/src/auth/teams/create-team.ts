import * as Auth from "@localfirst/auth"
import createDevice from "../devices/create-device.ts"
import storeDocIdOnTeam from "./store-doc-id-on-team.ts"
import start from "../../repo/start-repo.ts"
import {createSpaceHandle} from "../../spaces/spaces-api.ts"

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
	const {auth, repo} = await start({user, device})
	const team = await auth.createTeam(teamName)
	const space = createSpaceHandle(repo)
	storeDocIdOnTeam(team, space.documentId)
	return {device, user, team, auth, repo}
}

export async function createDefaultTeam({
	userName,
}: Omit<CreateTeamOptions, "teamName" | "deviceName">) {
	return createTeam({userName, teamName: userName})
}
