import {createContext, useContext} from "solid-js"
import {SourceRegistry} from "./registries/source-registry.ts"
import {ViewRegistry} from "./registries/view-registry.ts"
import type {View} from "./types/view.ts"
import type {Source} from "./types/source.ts"
import * as Comlink from "comlink"
import debug from "debug"
import type {PluginAPIWorker} from "./workers/worker.ts"
import type {AutomergeUrl, Repo} from "@automerge/vanillajs"
import {PublisherRegistry} from "./registries/publisher-registry.ts"
import type {Publisher} from "./types/publisher.ts"
const log = debug("littlebook:plugin-api")
import * as wellKnownShapes from "./shapes/shapes.ts"

const workerProgram = new Worker(
	new URL("./workers/worker.ts", import.meta.url),
	{type: "module"}
)

export type {View, Source}

// todo something like .toast should be here
export default class PluginAPI {
	private viewRegistry: ViewRegistry
	private sourceRegistry: SourceRegistry
	private sinkRegistry: PublisherRegistry
	worker: Comlink.Remote<PluginAPIWorker>
	// todo shape registry?????
	wellKnownShapes = wellKnownShapes

	constructor(repo: Repo) {
		this.viewRegistry = new ViewRegistry({repo})
		this.sourceRegistry = new SourceRegistry({repo})
		this.sinkRegistry = new PublisherRegistry({repo})
		this.worker = Comlink.wrap(workerProgram)
	}
	// callCommand<T>(commandId: string, args?: T): void
	// registerCommand<T>(command: Command): void

	registerView<T>(view: View<T>) {
		this.viewRegistry.register(view)
		log("view registered", view.id)
	}

	registerSource<T>(source: Source<T>) {
		this.sourceRegistry.register(source)
		log("source registered", source.id)
	}

	registerPublisher<T>(publisher: Publisher<T>) {
		this.sinkRegistry.register(publisher)
		log("publisher registered", publisher.id)
	}

	// todo this should actually register it, and something else should inject these scripts
	registerPlugin(url: AutomergeUrl) {
		log("registering plugin", url)
		this.worker.compile(url).then(output => {
			const ex = document.querySelector(`script[data-plugin="${url}"]`)
			if (ex) ex.remove()
			const s = document.createElement("script")
			s.setAttribute("type", "module")
			s.dataset.plugin = url
			s.textContent = output.outputFiles?.[0].text ?? ""
			document.head.appendChild(s)
		})
	}

	// todo registerActor/registerProcess?
	// todo registerTask
	// todo registerCommand
	// todo registerWorker
	// todo registerIndexer
}

export const PluginAPIContext = createContext<PluginAPI>()

export function usePluginAPI() {
	const context = useContext(PluginAPIContext)
	if (!context) {
		throw new Error(
			"[plugin-api]: `usePluginAPI` must be used within a `PluginAPIProvider` component"
		)
	}
	return context
}

export function useViewRegistry() {
	const api = usePluginAPI()
	// @ts-expect-error i know it's private, but it's mine
	return api.viewRegistry
}

export function useSourceRegistry() {
	const api = usePluginAPI()
	// @ts-expect-error i know it's private, but it's mine
	return api.sourceRegistry
}

export function usePublisherRegistry() {
	const api = usePluginAPI()
	// @ts-expect-error i know it's private, but it's mine
	return api.sinkRegistry
}
