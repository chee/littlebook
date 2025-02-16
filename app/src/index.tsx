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

import {ViewRegistry, ViewRegistryContext} from "./registries/view-registry.ts"

import {
	ContentTypeRegistry,
	ContentTypeRegistryContext,
} from "./registries/content-type-registry.ts"

import {
	SourceRegistry,
	SourceRegistryContext,
} from "./registries/source-registry.ts"

import repo from "./repo/create.ts"
import {RepoContext} from "solid-automerge"
import {createRoot} from "solid-js"
import {SinkRegistry, SinkRegistryContext} from "./registries/sink-registry.ts"
import PluginAPI, {PluginAPIContext} from "./plugins/plugin-api.ts"

createRoot(() => {
	const contentTypeRegistry = new ContentTypeRegistry({repo})
	const coderRegistry = new SourceRegistry({repo})
	const editorRegistry = new ViewRegistry({repo, contentTypeRegistry})
	const publisherRegistry = new SinkRegistry({repo, contentTypeRegistry})
	const pluginAPI = new PluginAPI({
		editorRegistry,
		coderRegistry,
		contentTypeRegistry,
		publisherRegistry,
	})

	render(
		() => (
			<ContentTypeRegistryContext.Provider value={contentTypeRegistry}>
				<SourceRegistryContext.Provider value={coderRegistry}>
					<ViewRegistryContext.Provider value={editorRegistry}>
						<SinkRegistryContext.Provider value={publisherRegistry}>
							<RepoContext.Provider value={repo}>
								<PluginAPIContext.Provider value={pluginAPI}>
									<App />
								</PluginAPIContext.Provider>
							</RepoContext.Provider>
						</SinkRegistryContext.Provider>
					</ViewRegistryContext.Provider>
				</SourceRegistryContext.Provider>
			</ContentTypeRegistryContext.Provider>
		),
		root
	)
})
