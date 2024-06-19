// @refresh reload
import {StartClient, mount} from "@solidjs/start/client"
import "solid-devtools"

mount(() => <StartClient />, document.getElementById("littlebook")!)

window.EXCALIDRAW_ASSET_PATH = "/"

import {removeDirectory} from "../lib/opfs.ts"
declare global {
	interface Window {
		clearOPFS: typeof removeDirectory
		EXCALIDRAW_ASSET_PATH: string
	}
}
window.clearOPFS = removeDirectory
