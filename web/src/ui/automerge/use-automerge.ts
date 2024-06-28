import {createContext, useContext} from "solid-js"
import start from "../../repo/start-repo.ts"
import * as local from "./local.ts"
import {createId} from "@paralleldrive/cuid2"
import {createUser} from "@localfirst/auth"
import {getShareId} from "@localfirst/auth-provider-automerge-repo"
import {createSpaceHandle} from "../../api/spaces.ts"
import storeDocIdOnTeam from "../../auth/teams/store-doc-id-on-team.ts"
import createDevice from "../../auth/devices/create-device.ts"

export const AutomergeContext = createContext<lb.AutomergeState>()

export function useAutomerge() {
	const context = useContext(AutomergeContext)
	if (!context) throw new Error("you gotta wrap me in a AutomergeContext")
	return context
}

export async function initialize() {
	// random user and team name
	const username = createId()
	const teamname = username
	const user = createUser(username)
	const device = createDevice(user.userId)
	console.log(user, user.userId)
	console.log(device)
	const {auth, repo} = await start({
		user,
		device,
	})
	console.log({auth, repo}, "we started")
	const team = await auth.createTeam(teamname)
	const spaceHandle = createSpaceHandle(repo)
	storeDocIdOnTeam(team, spaceHandle.documentId)
	local.set({
		user,
		device,
		home: getShareId(team),
	})
}
