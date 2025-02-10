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
import "./repo/api.ts"

declare global {
	interface Window {
		log: ReturnType<typeof import("debug")>
	}
}

if (import.meta.env.DEV) {
	attachDevtoolsOverlay()
} else {
	registerServiceWorker()
}

const root = document.getElementById("root")!

import {
	EditorRegistry,
	EditorRegistryContext,
} from "./registries/editor-registry.ts"

import {
	ContentTypeRegistry,
	ContentTypeRegistryContext,
} from "./registries/content-type-registry.ts"

import {
	CoderRegistry,
	CoderRegistryContext,
} from "./registries/coder-registry.ts"

import repo from "./repo/create.ts"
import {RepoContext} from "solid-automerge"
import {createRoot} from "solid-js"
import {
	PublisherRegistry,
	PublisherRegistryContext,
} from "./registries/publisher-registry.ts"
import PluginAPI, {PluginAPIContext} from "./plugins/plugin-api.ts"

createRoot(() => {
	const contentTypeRegistry = new ContentTypeRegistry({repo})
	const coderRegistry = new CoderRegistry({repo})
	const editorRegistry = new EditorRegistry({repo, contentTypeRegistry})
	const publisherRegistry = new PublisherRegistry({repo, contentTypeRegistry})
	const pluginAPI = new PluginAPI({
		editorRegistry,
		coderRegistry,
		contentTypeRegistry,
		publisherRegistry,
	})

	render(
		() => (
			<ContentTypeRegistryContext.Provider value={contentTypeRegistry}>
				<CoderRegistryContext.Provider value={coderRegistry}>
					<EditorRegistryContext.Provider value={editorRegistry}>
						<PublisherRegistryContext.Provider value={publisherRegistry}>
							<RepoContext.Provider value={repo}>
								<PluginAPIContext.Provider value={pluginAPI}>
									<App />
								</PluginAPIContext.Provider>
							</RepoContext.Provider>
						</PublisherRegistryContext.Provider>
					</EditorRegistryContext.Provider>
				</CoderRegistryContext.Provider>
			</ContentTypeRegistryContext.Provider>
		),
		root
	)
})
