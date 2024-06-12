import {render} from "preact"
import {AuthContextProvider} from "./auth/auth-provider.tsx"
import SpacePage from "./ui/space-page.tsx"
import "./ui/ui.css"
import {removeDirectory} from "./ui/opfs.ts"
import {LittlebookAPIProvider} from "./api/littlebook-api-provider.tsx"
import {SpaceUIStateProvider} from "./ui/space-ui-state.tsx"

render(
	<AuthContextProvider>
		<LittlebookAPIProvider>
			<SpaceUIStateProvider>
				<SpacePage />
			</SpaceUIStateProvider>
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

// todo!
// navigator.registerProtocolHandler(
// 	"web+lb",
// 	location.protocol + "//" + location.host + "/?q=%s",
// )
