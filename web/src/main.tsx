import {render} from "preact"
import "./style.css"
import {AuthContextProvider} from "./components/auth-provider.tsx"
import Littlebook from "./components/littlebook.tsx"

import contentTypeRegistry from "./automerge/content/content-type-registry.ts"
import {textCreator, TextView} from "./automerge/content/text-content.tsx"
import {removeDirectory} from "./opfs.ts"
import {
	excalidrawCreator,
	ExcalidrawView,
} from "./automerge/content/excalidraw-content.tsx"
import {imageCreator, ImageView} from "./automerge/content/image-content.tsx"

contentTypeRegistry.define("txt", textCreator, TextView)
contentTypeRegistry.define("excalidraw", excalidrawCreator, ExcalidrawView)
contentTypeRegistry.define("jpg", imageCreator, ImageView)
contentTypeRegistry.define("jpeg", imageCreator, ImageView)
contentTypeRegistry.define("png", imageCreator, ImageView)

render(
	<AuthContextProvider>
		<Littlebook />
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
