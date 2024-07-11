import UniformType, {
	type UniformTypeDescriptor,
	type UniformTypeIdentifier,
} from "../files/contents/uniform-type.ts"

import {
	contentViewRegistry,
	type ContentViewName,
} from "../files/contents/content-view.ts"
import registerDefaultViews from "../files/views/index.ts"
import {getOwner} from "solid-js"
import {runWithOwner} from "solid-js"
import * as pluginAPI from "../plugins/plugin-api.ts"

let contentCoderActivators = {} as Record<
	UniformTypeIdentifier,
	{
		active: boolean
		activate: (() => Promise<void>)[]
	}
>
let contentViewActivators = {} as Record<
	ContentViewName,
	{
		active: boolean
		activate: (() => Promise<void>)[]
	}
>

async function call<T extends string>(
	id: T,
	activators: Record<T, {active: boolean; activate: (() => Promise<void>)[]}>,
) {
	if (id in activators) {
		if (!activators[id].active) {
			await Promise.race(activators[id].activate.map(fn => fn()))
			activators[id].active = true
		}
	}
}

async function push<T extends string>(
	ids: T[],
	activators: Record<T, {active: boolean; activate: (() => Promise<void>)[]}>,
	item: () => Promise<void>,
) {
	for (let id of ids) {
		if (id in activators) {
			activators[id].activate.push(item)
		} else {
			activators[id] = {
				active: false,
				activate: [item],
			}
		}
	}
}

document.addEventListener("contentcoderrequest", async event =>
	call(event.detail, contentCoderActivators),
)
document.addEventListener("contentviewrequest", async event =>
	call(event.detail, contentViewActivators),
)

// todo not hardcode this
let plugins = ["excalidraw", "text", "books", "tldraw"]
async function loadPluginsFromPluginServer(urlbase: string) {
	let owner = getOwner()

	let fetches = []

	for (let pluginName of plugins) {
		let plugbase = `${urlbase}plugins/${pluginName}`
		fetches.push(
			fetch(`${plugbase}/package.json`)
				.then(resp => resp.json())
				.then(pkg => {
					if ("littlebook" in pkg) {
						let config = pkg.littlebook as lb.plugins.Manifest
						if (!config) return
						runWithOwner(owner, () => {
							let {types, viewNames} = registerFromManifest(config)
							let url = `${plugbase}/${pkg.browser || pkg.main || "index.js"}`
							let imp = async () =>
								import(/* @vite-ignore */ url).then(mod =>
									mod.default(pluginAPI),
								)
							push(types, contentCoderActivators, imp)
							push(viewNames, contentViewActivators, imp)
						})
					}
				}),
		)
	}

	await Promise.allSettled(fetches)
}

declare global {
	interface DocumentEventMap {
		contentcoderrequest: CustomEvent<UniformTypeIdentifier>
		contentviewrequest: CustomEvent<ContentViewName>
	}
}

function registerFromManifest(manifest: lb.plugins.Manifest) {
	let types: UniformTypeIdentifier[] = []
	let viewNames: ContentViewName[] = []
	for (let type of manifest.contentTypes || []) {
		types.push(type.identifier as UniformTypeIdentifier)
		UniformType.add(type as UniformTypeDescriptor)
	}
	for (let view of manifest.editors || []) {
		viewNames.push(view.element as ContentViewName)
		contentViewRegistry.addEditor(view)
	}
	for (let view of manifest.previews || []) {
		viewNames.push(view.element as ContentViewName)
		contentViewRegistry.addPreview(view)
	}
	return {types, viewNames}
}

export default async function startPlugins() {
	registerDefaultViews()
	loadPluginsFromPluginServer(import.meta.env.LB_SRV_URL_BASE)
	// loadPluginsFromDependencies()
}
