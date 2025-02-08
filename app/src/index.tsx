/* @refresh reload */
import "./styles/preflight.css"
import "./styles/font-face.css"
import "./styles/global.css"
import "./styles/palette.css"
import "./styles/animations.css"

import {render} from "solid-js/web"
import App from "./pages/app.tsx"
import {attachDevtoolsOverlay} from "@solid-devtools/overlay"
import registerServiceWorker from "./register-service-worker.ts"
import "./documents/entry.ts"
import "./repo/api.ts"

if (import.meta.env.DEV) {
	attachDevtoolsOverlay()
} else {
	registerServiceWorker()
}

const root = document.getElementById("root")!

import {
	EditorRegistry,
	EditorRegistryContext,
} from "./registries/editor/editor-registry.ts"

import {
	ContentTypeRegistry,
	ContentTypeRegistryContext,
} from "./registries/content-type/content-type-registry.ts"

import {
	CoderRegistry,
	CoderRegistryContext,
} from "./registries/coder/coder-registry.ts"

import repo from "./repo/create.ts"
import {RepoContext} from "solid-automerge"
import {createRoot} from "solid-js"

createRoot(() => {
	const contentTypeRegistry = new ContentTypeRegistry({repo})
	const coderRegistry = new CoderRegistry({repo})
	const editorRegistry = new EditorRegistry({repo, contentTypeRegistry})

	render(
		() => (
			<ContentTypeRegistryContext.Provider value={contentTypeRegistry}>
				<CoderRegistryContext.Provider value={coderRegistry}>
					<EditorRegistryContext.Provider value={editorRegistry}>
						<RepoContext.Provider value={repo}>
							<App />
						</RepoContext.Provider>
					</EditorRegistryContext.Provider>
				</CoderRegistryContext.Provider>
			</ContentTypeRegistryContext.Provider>
		),
		root
	)
})
