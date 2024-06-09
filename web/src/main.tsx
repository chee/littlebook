import {render} from "preact"
import "./ui/style.css"
import {AuthContextProvider} from "./auth/auth-provider.tsx"
import Littlebook from "./ui/layout.tsx"

import {removeDirectory} from "./ui/opfs.ts"
import {LittlebookAPIProvider} from "./api/littlebook-provider.tsx"
import {Route, Switch} from "wouter-preact"
import ProjectPage from "./projects/project-page.tsx"

render(
	<AuthContextProvider>
		<LittlebookAPIProvider>
			<Littlebook>
				<Switch>
					<Route component={ProjectPage} path="/projects/:slug/:projectId" />
				</Switch>
			</Littlebook>
		</LittlebookAPIProvider>
	</AuthContextProvider>,
	document.getElementById("littlebook")!,
)

declare global {
	interface Window {
		clearOPFS: typeof removeDirectory
		EXCALIDRAW_ASSET_PATH: string
	}
}
window.clearOPFS = removeDirectory
