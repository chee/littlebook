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
	let promises: Promise<void>[] = []
	let pluginDatabase = await db
	for (let pluginName of import.meta.env.SERVER_PLUGINS) {
		let url = `${urlbase}plugins/${pluginName}`
		console.info(url)
		promises.push(
			fetch(url).then(async response => {
				let files = await extractPlugin(response.body!)
				await storePlugin(pluginDatabase, files)
			}),
		)
		await fetch(url).then(response => response.body)
	}
}

let idb = indexedDB.open("lbplugin", 1)
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

function loadPluginsFromIDB(pluginDatabase: IDBDatabase) {
	let owner = getOwner()

	let tr = pluginDatabase.transaction(["manifests", "bundles"], "readonly")

	return new Promise<void>(yaycursor => {
		let cursorResult = tr.objectStore("manifests").openCursor()
		cursorResult.onsuccess = () => {
			let cursor = cursorResult.result

			if (cursor) {
				let manifest = cursor.value as lb.plugins.Manifest
				let bytes = tr.objectStore("bundles").get(cursor.key)
				bytes.onsuccess = () => {
					let b = bytes.result as Uint8Array
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
	let files = await extractPlugin(computerFile.stream())
	let pluginDatabase = await db
	storePlugin(pluginDatabase, files)
	runWithOwner(owner, () => loadPluginsFromIDB(pluginDatabase))
}

interface TarEntry {
	/**
	 * File name
	 */
	name: string
	/**
	 * File data (don't provide for directories)
	 */
	data?: Uint8Array
}

// todo rather than expecting these specific files, should i just straight-up
// extract all the bundled files into the indexeddb (or store and load the
// actual gzipped file and extract it on load?) that way i could handle multiple
// files, assets, sourcemaps etc in the future... unbundled plugins
export async function extractPlugin(stream: ReadableStream<Uint8Array>) {
	let gunzip = new DecompressionStream("gzip")
	let ball = stream.pipeThrough(gunzip)
	let buffer = await new Response(ball).arrayBuffer()
	let files = nanotar.parseTar(buffer)
	let manifestFile = files.find(file => file.name == "lb.json")
	let bundleFile = files.find(file => file.name == "bundle.js")
	return {manifest: manifestFile!, bundle: bundleFile!}
}

export function storePlugin(
	pluginDatabase: IDBDatabase,
	files: {
		manifest: TarEntry
		bundle: TarEntry
	},
) {
	let manifest = JSON.parse(new TextDecoder().decode(files.manifest.data))
	let tr = pluginDatabase.transaction(["manifests", "bundles"], "readwrite", {
		durability: "strict",
	})
	tr.objectStore("manifests").put(manifest, manifest.name)
	tr.objectStore("bundles").put(files.bundle.data, manifest.name)
}

export default async function startPlugins() {
	let owner = getOwner()
	registerDefaultViews()
	let pluginDatabase = await db
	await downloadPluginsFromPluginServer("/")
		.then(() => runWithOwner(owner, () => loadPluginsFromIDB(pluginDatabase)))
		.catch(() => runWithOwner(owner, () => loadPluginsFromIDB(pluginDatabase)))
}
