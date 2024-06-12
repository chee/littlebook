import {useRepo} from "@automerge/automerge-repo-react-hooks"
import {createContext, type FunctionalComponent} from "preact"
import createLittlebookAPI from "./create-littlebook-api.ts"
import {useAuth} from "../ui/auth/use-auth.ts"

export const LittlebookAPIContext = createContext<
	ReturnType<typeof createLittlebookAPI> | undefined
>(undefined)

/**
 * To use the app, we need a user, a device, and a team. If we've used the app before,
 * these will be persisted locally. If not, we'll need to create them.
 */
export const LittlebookAPIProvider: FunctionalComponent = ({children}) => {
	const repo = useRepo()
	const api = createLittlebookAPI(repo)
	const {auth, team} = useAuth()
	// hack that seems to work when the server freaks out
	auth.createTeam(team.teamName)

	return (
		<LittlebookAPIContext.Provider value={api}>
			{children}
		</LittlebookAPIContext.Provider>
	)
}
