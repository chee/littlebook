/* @refresh reload */
import {createEffect, type JSXElement} from "solid-js"
import defaultRepo from ":/core/sync/automerge.ts"
import {UserDocContext, useUserDoc} from ":/domain/user/user.ts"

import {
	SourceRegistry,
	SourceRegistryContext,
} from ":/registries/source-registry.ts"
import {ViewRegistry, ViewRegistryContext} from ":/registries/view-registry.ts"
import PluginAPI, {PluginAPIContext} from ":/plugins/plugin-api.ts"
import {useNavigate} from "@solidjs/router"
import {useUserId} from ":/domain/user/user-id.ts"

export default function LoggedInLayout(props: {children?: JSXElement}) {
	const nav = useNavigate()
	const [userId] = useUserId()
	createEffect(() => {
		if (!userId()) nav("/")
	})
	const sourceRegistry = new SourceRegistry({repo: defaultRepo})
	const viewRegistry = new ViewRegistry({repo: defaultRepo})
	const pluginAPI = new PluginAPI({
		viewRegistry,
		sourceRegistry,
	})
	self.littlebook = pluginAPI
	const user = useUserDoc(defaultRepo)
	return (
		<UserDocContext.Provider value={user}>
			<SourceRegistryContext.Provider value={sourceRegistry}>
				<ViewRegistryContext.Provider value={viewRegistry}>
					<PluginAPIContext.Provider value={pluginAPI}>
						{props.children}
					</PluginAPIContext.Provider>
				</ViewRegistryContext.Provider>
			</SourceRegistryContext.Provider>
		</UserDocContext.Provider>
	)
}

declare global {
	interface Window {
		littlebook: PluginAPI
		log: ReturnType<typeof import("debug")>
	}
}
