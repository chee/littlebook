import UniformType, {
	type UniformTypeDescriptor,
	type UniformTypeIdentifier,
} from "../files/contents/uniform-type.ts"
import * as pluginAPI from "./plugin-api.ts"
import {contentViewRegistry} from "../files/contents/content-view.ts"
// const plugins = [excalidraw, text, media, unknown, books, tldraw]

// todo add a manifest to plugins so they can be imported dynamically
// for (const plugin of plugins) {
// plugin(pluginAPI)
// }

const serverPlugins = ["tldraw"]

export default function startPlugins() {
	for (const pluginName of serverPlugins) {
		const plugbase = `${import.meta.env.LB_SRV_URL_BASE}/plugins/${pluginName}`
		fetch(`${plugbase}/package.json`)
			.then(resp => resp.json())
			.then(pkg => {
				if ("littlebook" in pkg) {
					const config = pkg.littlebook
					if (!config) return
					for (const type of config.contentTypes || []) {
						UniformType.add(type as UniformTypeDescriptor)
					}
					for (const view of config.contentViews || []) {
						contentViewRegistry.register(
							view.contentTypes as UniformTypeIdentifier[],
							view.identifier,
						)
					}

					import(
						/* @vite-ignore */ `${plugbase}/${pkg.browser || pkg.main || "index.js"}`
					).then(mod => {
						mod.default(pluginAPI)
					})
				}
			})
	}
}
