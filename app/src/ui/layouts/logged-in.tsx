/* @refresh reload */
import {createEffect, type JSXElement} from "solid-js"
import {UserContext, useUserDocument as useUser} from ":/domain/user/user.ts"
import {useNavigate} from "@solidjs/router"
import {useUserId} from ":/domain/user/user-id.ts"
import PluginAPI, {PluginAPIContext} from "@littlebook/plugin-api"
import usePerfectRepo from ":/lib/sync/useRepo.ts"

export default function LoggedInLayout(props: {children?: JSXElement}) {
	const nav = useNavigate()
	const [userId] = useUserId()
	createEffect(() => {
		if (!userId()) nav("/")
	})

	const repo = usePerfectRepo()

	const pluginAPI = new PluginAPI(repo)

	self.littlebook = pluginAPI
	const user = useUser()
	// todo global selection context?
	return (
		<UserContext.Provider value={user}>
			<PluginAPIContext.Provider value={pluginAPI}>
				{props.children}
			</PluginAPIContext.Provider>
		</UserContext.Provider>
	)
}

declare global {
	interface Window {
		littlebook: PluginAPI
		log: ReturnType<typeof import("debug")>
	}
}
