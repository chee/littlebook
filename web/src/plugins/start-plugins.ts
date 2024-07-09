import UniformType, {
	type UniformTypeDescriptor,
	type UniformTypeIdentifier,
} from "../files/contents/uniform-type.ts"
import * as pluginAPI from "./plugin-api.ts"
import {contentViewRegistry} from "../files/contents/content-view.ts"

// todo not hardcode this
const plugins = ["excalidraw", "text", "books", "tldraw"]
async function loadPluginsFromPluginServer(urlbase: string) {
	const loaded: Record<
		string,
		{
			types: string[]
			viewNames: string[]
			url: string
			activated: boolean
		}
	> = {}

	const fetches = []

	for (const pluginName of plugins) {
		const plugbase = `${urlbase}plugins/${pluginName}`
		fetches.push(
			fetch(`${plugbase}/package.json`)
				.then(resp => resp.json())
				.then(pkg => {
					if ("littlebook" in pkg) {
						const config = pkg.littlebook as lb.plugins.Manifest
						if (!config) return
						const {types, viewNames} = registerFromManifest(config)
						loaded[pkg.name] = {
							types,
							viewNames,
							activated: false,
							url: `${plugbase}/${pkg.browser || pkg.main || "index.js"}`,
						}
					}
				}),
		)
	}

	await Promise.allSettled(fetches)

	document.addEventListener(
		"contentcoderrequest",
		function handler(event: CustomEvent<string>) {
			for (const info of Object.values(loaded)) {
				if (info.types.includes(event.detail)) {
					if (!info.activated) {
						import(/* @vite-ignore */ info.url).then(mod =>
							mod.default(pluginAPI),
						)
						info.activated = true
					}
				}
			}
		},
	)
	document.addEventListener(
		"contentviewrequest",
		function handler(event: CustomEvent<string>) {
			for (const info of Object.values(loaded)) {
				if (info.viewNames.includes(event.detail)) {
					if (!info.activated) {
						import(/* @vite-ignore */ info.url).then(mod =>
							mod.default(pluginAPI),
						)
						info.activated = true
					}
				}
			}
		},
	)
}

declare global {
	interface DocumentEventMap {
		contentcoderrequest: CustomEvent<string>
		contentviewrequest: CustomEvent<string>
	}
}

function registerFromManifest(manifest: lb.plugins.Manifest) {
	const types: string[] = []
	const viewNames: string[] = []
	for (const type of manifest.contentTypes || []) {
		types.push(type.identifier)
		UniformType.add(type as UniformTypeDescriptor)
	}
	for (const view of manifest.contentViews || []) {
		viewNames.push(view.identifier)
		contentViewRegistry.register(
			view.contentTypes as UniformTypeIdentifier[],
			view.identifier,
		)
	}
	return {types, viewNames}
}

import registerDefaultViews from "../files/views/index.ts"
export default async function startPlugins() {
	registerDefaultViews()
	loadPluginsFromPluginServer(import.meta.env.LB_SRV_URL_BASE)
	// loadPluginsFromDependencies()
}
