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
import * as pluginAPI from "./plugin-api.ts"
import * as nanotar from "nanotar"
import {createStore} from "solid-js/store"

export const pluginStore = createStore({
	coders: {} as Record<
		UniformTypeIdentifier,
		{active: boolean; activate(): Promise<void>}
	>,
	views: {} as Record<
		ContentViewName,
		{active: boolean; activate(): Promise<void>}
	>,
})

async function downloadPluginsFromPluginServer(urlbase: string) {
	let downloaded: string[] = []
	let pluginDatabase = await db

	for (let pluginName of import.meta.env.SERVER_PLUGINS) {
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

					tr.objectStore("manifests").put(manifest, pkg.name)
					tr.objectStore("bundles").put(bundle, pkg.name)

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

let idb = indexedDB.open("littleplugins", 7)
idb.addEventListener("upgradeneeded", () => {
	let db = idb.result
	if (db.objectStoreNames.contains("manifests")) {
		db.deleteObjectStore("manifests")
		db.deleteObjectStore("bundles")
	}
	db.createObjectStore("manifests")
	db.createObjectStore("bundles")
})
let db = new Promise<IDBDatabase>(yay => {
	idb.addEventListener("success", () => {
		yay(idb.result)
	})
})

async function loadPluginsFromIDB() {
	let owner = getOwner()

	let pluginDatabase = await db

	let tr = pluginDatabase.transaction(["manifests", "bundles"], "readonly")

	return new Promise<void>(yaycursor => {
		let cursorResult = tr.objectStore("manifests").openCursor()
		cursorResult.onsuccess = () => {
			let cursor = cursorResult.result

			if (cursor) {
				let manifest = cursor.value as lb.plugins.Manifest
				let bytes = tr.objectStore("bundles").get(cursor.key)
				bytes.onsuccess = () => {
					let b = bytes.result
					let blob = new Blob([b], {type: "application/javascript"})
					let url = URL.createObjectURL(blob)
					let activate = async () => {
						return import(/* @vite-ignore */ url).then(mod =>
							mod.default(pluginAPI),
						)
					}
					runWithOwner(owner, () => {
						let [_plugins, update] = pluginStore
						const activator = {
							active: false,
							activate,
						}
						for (let type of manifest.contentTypes || []) {
							update(
								"coders",
								type.identifier as UniformTypeIdentifier,
								activator,
							)
							UniformType.add(type as UniformTypeDescriptor)
						}
						for (let view of manifest.previews || []) {
							update("views", view.element as ContentViewName, activator)
							contentViewRegistry.addPreview(view)
						}
						for (let view of manifest.editors || []) {
							update("views", view.element as ContentViewName, activator)
							contentViewRegistry.addEditor(view)
						}
					})

					cursor.continue()
				}
			} else {
				yaycursor()
			}
		}
	})
}

export async function importPlugin(computerFile: File) {
	let owner = getOwner()

	let gunzip = new DecompressionStream("gzip")
	let ball = computerFile.stream().pipeThrough(gunzip)
	let buffer = await new Response(ball).arrayBuffer()
	let pluginDatabase = await db
	let files = nanotar.parseTar(buffer)
	let manifestFile = files.find(file => file.name == "lb.json")
	let bundleFile = files.find(file => file.name == "bundle.js")
	let manifest = JSON.parse(new TextDecoder().decode(manifestFile?.data))
	let tr = pluginDatabase.transaction(["manifests", "bundles"], "readwrite", {
		durability: "strict",
	})
	tr.objectStore("manifests").put(manifest, manifest.name)
	tr.objectStore("bundles").put(bundleFile?.data, manifest.name)

	runWithOwner(owner, () => loadPluginsFromIDB())
}

export default async function startPlugins() {
	let owner = getOwner()
	registerDefaultViews()
	await downloadPluginsFromPluginServer("/")
		.then(() => runWithOwner(owner, () => loadPluginsFromIDB()))
		.catch(() => runWithOwner(owner, () => loadPluginsFromIDB()))
}
