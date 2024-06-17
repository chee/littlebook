// @refresh reload
import {render} from "solid-js/web"
import "solid-devtools"
import Littlebook from "./app.tsx"

render(() => <Littlebook />, document.getElementById("littlebook")!)

window.EXCALIDRAW_ASSET_PATH = "/"

import {removeDirectory} from "../lib/opfs.ts"
declare global {
	interface Window {
		clearOPFS: typeof removeDirectory
		EXCALIDRAW_ASSET_PATH: string
	}
}
window.clearOPFS = removeDirectory
