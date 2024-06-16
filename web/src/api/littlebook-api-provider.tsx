import {useRepo} from "@automerge/automerge-repo-react-hooks"
import {createContext, type FunctionalComponent} from "preact"
import createLittlebookAPI from "./create-littlebook-api.ts"
import {useAuth} from "../ui/auth/use-auth.ts"
import {useMemo} from "preact/hooks"

export const LittlebookAPIContext = createContext<
	ReturnType<typeof createLittlebookAPI> | undefined
>(undefined)

/**
 * To use the app, we need a user, a device, and a team. If we've used the app before,
 * these will be persisted locally. If not, we'll need to create them.
 */
export const LittlebookAPIProvider: FunctionalComponent = ({children}) => {
	const repo = useRepo()
	const api = useMemo(() => createLittlebookAPI(repo), [])

	return (
		<LittlebookAPIContext.Provider value={api}>
			{children}
		</LittlebookAPIContext.Provider>
	)
}
