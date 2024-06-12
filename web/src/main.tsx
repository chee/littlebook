import {render} from "preact"
import {AuthContextProvider} from "./ui/auth/auth-provider.tsx"
import SpacePage from "./ui/space/space-page.tsx"
import {removeDirectory} from "./ui/opfs.ts"
import {LittlebookAPIProvider} from "./api/littlebook-api-provider.tsx"
import {SpaceStateProvider} from "./ui/space/space-state.tsx"

render(
	<AuthContextProvider>
		<LittlebookAPIProvider>
			<SpaceStateProvider>
				<SpacePage />
			</SpaceStateProvider>
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
