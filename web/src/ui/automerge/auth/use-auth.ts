import {createEffect, useContext} from "solid-js"
import {AuthContext} from "./auth-provider.tsx"

export const useAuth = () => {
	const context = useContext(AuthContext)
	console.log("c", context)
	createEffect(() => console.log("cc", context))
	// if (!context) throw new Error("you gotta wrap me in a AuthContextProvider")
	return context
}
