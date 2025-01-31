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
import {RepoContext} from "automerge-repo-solid-primitives"
import type {Repo} from "@automerge/automerge-repo/slim"

render(
	() => (
		<ContentTypeRegistryContext.Provider
			value={new ContentTypeRegistry({repo})}>
			<CoderRegistryContext.Provider value={new CoderRegistry({repo})}>
				<EditorRegistryContext.Provider value={new EditorRegistry({repo})}>
					<RepoContext.Provider value={repo as unknown as Repo}>
						<App />
					</RepoContext.Provider>
				</EditorRegistryContext.Provider>
			</CoderRegistryContext.Provider>
		</ContentTypeRegistryContext.Provider>
	),
	root
)
