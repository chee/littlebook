import UniformType, {
	type UniformTypeDescriptor,
	type UniformTypeIdentifier,
} from "../files/contents/uniform-type.ts"
import * as pluginAPI from "./plugin-api.ts"
import {contentViewRegistry} from "../files/contents/content-view.ts"
import pluginRegistry from "./plugin-registry.ts"
// const plugins = [excalidraw, text, media, unknown, books, tldraw]

// todo add a manifest to plugins so they can be imported dynamically
// for (const plugin of plugins) {
// plugin(pluginAPI)
// }

async function loadPluginsFromPluginServer(urlbase: string) {
	const plugins = await (await fetch(`${urlbase}/installed-plugins`)).json()

	for (const pluginName of plugins) {
		const plugbase = `${urlbase}/plugins/${pluginName}`
		fetch(`${plugbase}/package.json`)
			.then(resp => resp.json())
			.then(pkg => {
				if ("littlebook" in pkg) {
					const types: string[] = []
					const viewNames: string[] = []
					const config = pkg.littlebook as lb.plugins.Manifest
					if (!config) return
					for (const type of config.contentTypes || []) {
						types.push(type.identifier)
						UniformType.add(type as UniformTypeDescriptor)
					}
					for (const view of config.contentViews || []) {
						viewNames.push(view.identifier)
						contentViewRegistry.register(
							view.contentTypes as UniformTypeIdentifier[],
							view.identifier,
						)
					}

					function activate() {
						console.log("activating")
						import(
							/* @vite-ignore */ `${plugbase}/${pkg.browser || pkg.main || "index.js"}`
						).then(mod => mod.default(pluginAPI))
					}

					let activated = false
					document.addEventListener(
						"contentcoderrequest",
						function handler(event: CustomEvent<string>) {
							if (activated) {
								document.removeEventListener("contentcoderrequest", handler)
							} else if (types.includes(event.detail)) {
								document.removeEventListener("contentcoderrequest", handler)
								activated = true
								activate()
							}
						},
					)
					document.addEventListener(
						"contentviewrequest",
						function handler(event: CustomEvent<string>) {
							if (activated) {
								document.removeEventListener("contentviewrequest", handler)
							} else if (viewNames.includes(event.detail)) {
								document.removeEventListener("contentviewrequest", handler)
								activated = true
								activate()
							}
						},
					)
				}
			})
	}
}

declare global {
	interface DocumentEventMap {
		contentcoderrequest: CustomEvent<string>
		contentviewrequest: CustomEvent<string>
	}
}

export default async function startPlugins() {
	loadPluginsFromPluginServer(import.meta.env.LB_SRV_URL_BASE)
}
