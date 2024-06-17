import * as Auth from "@localfirst/auth"
import createDevice from "../devices/create-device.ts"
import storeDocIdOnTeam from "./store-doc-id-on-team.ts"
import start from "../../repo/start-repo.ts"
import {createSpaceHandle} from "../../api/spaces.ts"

export interface CreateTeamOptions {
	teamName: string
	username: string
	deviceName?: string
}

export type CreateDefaultTeamOptions = Omit<
	CreateTeamOptions,
	"teamName" | "deviceName"
>

export default async function createTeam({
	teamName,
	username: userName,
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
	username: userName,
}: CreateDefaultTeamOptions) {
	return createTeam({username: userName, teamName: userName})
}
