import "../app.scss"

import {MetaProvider, Title} from "@solidjs/meta"
import {Router} from "@solidjs/router"
import {FileRoutes} from "@solidjs/start/router"
import {Suspense} from "solid-js"

import {AuthContextProvider} from "../automerge/auth/auth-provider.tsx"
import {LittlebookAPIProvider} from "../api/api-provider.tsx"
// import {SpaceStateProvider} from "../littlebook/spaces/space-state.tsx"

export default function Littlebook() {
	return (
		<Router
			root={props => (
				<MetaProvider>
					<Title>littlebook</Title>
					<AuthContextProvider>
						<LittlebookAPIProvider>
							<SpaceStateProvider>
								<Suspense>{props.children}</Suspense>
							</SpaceStateProvider>
						</LittlebookAPIProvider>
					</AuthContextProvider>
				</MetaProvider>
			)}>
			<FileRoutes />
		</Router>
	)
}

declare global {
	interface Window {
		clearOPFS: typeof removeDirectory
		EXCALIDRAW_ASSET_PATH: string
	}
}
window.clearOPFS = removeDirectory

// todo!
// navigator.registerProtocolHandler(
// 	"web+lb",
// 	location.protocol + "//" + location.host + "/?q=%s",
// )
