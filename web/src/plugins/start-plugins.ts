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

// async function downloadPluginsFromPluginServer(urlbase: string) {
// 	let fetches = []

// 	for (let pluginName of plugins) {
// 		let plugbase = `${urlbase}plugins/${pluginName}`
// 		fetches.push(
// 			fetch(`${plugbase}/package.json`)

// 				.then(resp => resp.json())
// 				.then(async pkg => {
// 					if ("littlebook" in pkg) {
// 						let manifest = pkg.littlebook as lb.plugins.Manifest
// 						if (!manifest) return
// 						localStorage.setItem(
// 							`plugin-${pluginName}-manifest`,
// 							JSON.stringify(manifest),
// 						)
// 						let url = `${plugbase}/${pkg.browser || pkg.main || "index.js"}`
// 						// todo blob or uint8array in indexeddb or file in opfs
// 						let bundle = await (await fetch(url)).text()
// 						localStorage.setItem(`plugin-${pluginName}-bundle`, bundle)
// 					}
// 				})
// 				.then(() => {
// 					return pluginName
// 				}),
// 		)
// 	}

// 	return Promise.allSettled(fetches)
// }

async function downloadPluginsFromPluginServer(urlbase: string) {
	let downloaded: string[] = []
	let pluginDatabase = await db

	for (let pluginName of plugins) {
		let plugbase = `${urlbase}plugins/${pluginName}`
		let name = await fetch(`${plugbase}/package.json`)
			.then(resp => resp.json())
			.then(async pkg => {
				if ("littlebook" in pkg) {
					let manifest = pkg.littlebook as lb.plugins.Manifest
					if (!manifest) return
					let url = `${plugbase}/${pkg.browser || pkg.main || "index.js"}`
					let bundle = new Uint8Array(await (await fetch(url)).arrayBuffer())

					let tr = pluginDatabase.transaction(
						["manifests", "bundles"],
						"readwrite",
						{durability: "strict"},
					)

					tr.objectStore("manifests").put(manifest, pluginName)
					tr.objectStore("bundles").put(bundle, pluginName)

					await new Promise((yay, boo) => {
						tr.oncomplete = yay
						tr.onerror = boo
						tr.onabort = boo
					})
				}
			})
			.then(() => {
				return pluginName
			})
			.catch(error => {
				console.error(error)
				return undefined
			})
		if (name) {
			downloaded.push(name)
		}
	}
	return downloaded
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

// async function loadPluginsFromLocalStorage() {
// 	let installed = JSON.parse(
// 		localStorage.getItem("installed-plugins")!,
// 	) as string[]

// 	for (let pluginName of installed) {
// 		let manifest = JSON.parse(
// 			localStorage.getItem(`plugin-${pluginName}-manifest`)!,
// 		) as lb.plugins.Manifest
// 		let {types, viewNames} = registerFromManifest(manifest)
// 		let imp = async () => {
// 			let bytes = new TextEncoder().encode(
// 				localStorage.getItem(`plugin-${pluginName}-bundle`)!,
// 			)
// 			let blob = new Blob([bytes], {type: "application/javascript"})
// 			let url = URL.createObjectURL(blob)
// 			return import(/* @vite-ignore */ url).then(mod => mod.default(pluginAPI))
// 		}

// 		push(types, contentCoderActivators, imp)
// 		push(viewNames, contentViewActivators, imp)
// 	}
// }

let idb = indexedDB.open("littleplugins", 6)
idb.addEventListener("upgradeneeded", event => {
	let db = idb.result
	if (db.objectStoreNames.contains("manifests")) {
		db.deleteObjectStore("manifests")
		db.deleteObjectStore("bundles")
	}
	db.createObjectStore("manifests")
	db.createObjectStore("bundles")
})
let db = new Promise<IDBDatabase>(yay => {
	idb.addEventListener("success", event => {
		yay(idb.result)
	})
})
// let store = db.then(db => {
// 	return new Promise<IDBObjectStore>(yay => {
// 		let tr = db.transaction(["littleplugins"], "readwrite")
// 		tr.objectStore("littleplugins")
// 	})
// })

async function loadPluginsFromIDB() {
	let owner = getOwner()
	let pluginDatabase = await db
	let installed = JSON.parse(
		localStorage.getItem("installed-plugins")!,
	) as string[]
	let tr = pluginDatabase.transaction(["manifests", "bundles"], "readonly")
	let loads = []
	for (let pluginName of installed) {
		let manifest = tr.objectStore("manifests").get(pluginName)
		let prom = new Promise<void>(yay => {
			manifest.onsuccess = () => {
				let result = runWithOwner(owner, () =>
					registerFromManifest(manifest.result),
				)
				if (result) {
					let {types, viewNames} = result
					let bytes = tr.objectStore("bundles").get(pluginName)
					bytes.onsuccess = () => {
						let b = bytes.result
						let blob = new Blob([b], {type: "application/javascript"})
						let url = URL.createObjectURL(blob)
						let imp = async () => {
							import(/* @vite-ignore */ url).then(mod => mod.default(pluginAPI))
						}
						push(types, contentCoderActivators, imp)
						push(viewNames, contentViewActivators, imp)
						yay()
					}
				}
			}
		})
		loads.push(prom)
	}
	await Promise.allSettled(loads)
}

export default async function startPlugins() {
	registerDefaultViews()
	// loadPluginsFromPluginServer(import.meta.env.LB_SRV_URL_BASE)
	let owner = getOwner()
	await downloadPluginsFromPluginServer("/")
		.then(names => {
			let currentPlugins = JSON.parse(
				localStorage.getItem("installed-plugins") || "[]",
			)
			let joined = new Set(...currentPlugins, ...names)
			localStorage.setItem(
				"installed-plugins",
				JSON.stringify(Array.from(joined)),
			)
			return runWithOwner(owner, () => loadPluginsFromIDB())
		})
		.catch(() => loadPluginsFromIDB())

	// loadPluginsFromDependencies()
}
