// @refresh reload
import {render} from "solid-js/web"
import Littlebook from "./littlebook.tsx"

window.EXCALIDRAW_ASSET_PATH = "/"

render(() => <Littlebook />, document.getElementById("littlebook")!)

import {removeDirectory} from "../../lib/opfs.ts"
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
