import {useContext} from "preact/hooks"
import {AuthContext} from "./auth-provider.tsx"

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error("you gotta wrap me in a AuthContextProvider")
	return context
}
