/**
 * TODO colocate files related to a littlebook concept, rather than a
 * function-type concept
 */
import {render} from "preact"
import "./style.css"
import {AuthContextProvider} from "./components/auth-provider.tsx"
import Littlebook from "./components/littlebook.tsx"

import {removeDirectory} from "./opfs.ts"
import {LittlebookAPIProvider} from "./components/api-provider.tsx"

render(
	<AuthContextProvider>
		<LittlebookAPIProvider>
			<Littlebook />
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
