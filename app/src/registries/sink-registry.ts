import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry} from "./registry.ts"
import {
	type Entry,
	type FileSink,
	type Sink,
	type TransmuteSink,
	type VoidSink,
} from "@pointplace/types"
import repo from "../repo/create.ts"

export class SinkRegistry extends Registry<"sink", Sink> {
	runFileSink = runFileSink
	runTransmuteSink = runTransmuteSink
	runVoidSink = runVoidSink

	run = runSink

	constructor({repo}: {repo: Repo}) {
		super({
			repo,
			doctype: "sink",
		})
	}

	*sinks(file: unknown) {
		for (const sink of Object.values(this.records)) {
			if (!sink.schema) {
				console.warn("view has no schema", sink)
				continue
			}
			const result = sink.schema["~standard"].validate(file)
			if (result instanceof Promise) {
				console.warn("schemas cannot be async")
				continue
			}
			if (result.issues) {
				continue
			} else {
				yield sink
			}
		}
	}
}

export const SinkRegistryContext = createContext<SinkRegistry>()

export function useSinkRegistry() {
	const value = useContext(SinkRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a PublisherRegistryContext")
	}
	return value
}

async function runFileSink(sink: FileSink<unknown>, entry: Entry) {
	const handle = await repo.findClassic(entry.url)
	const file = await sink.publish({handle, entry})
	const a = document.createElement("a")
	a.download = file.name
	a.href = URL.createObjectURL(file)
	a.click()
}

async function runTransmuteSink(sink: TransmuteSink<unknown>, entry: Entry) {
	return repo.create(
		sink.publish({handle: await repo.findClassic(entry.url), entry})
	)
}

async function runVoidSink(sink: VoidSink<unknown>, entry: Entry) {
	return sink.publish({handle: await repo.findClassic(entry.url), entry})
}

async function runSink(sink: Sink, entry: Entry) {
	if (sink.category === "file") {
		return runFileSink(sink as FileSink<unknown>, entry)
	}
	if (sink.category === "transmute") {
		return runTransmuteSink(sink, entry)
	}
	if (sink.category === "void") {
		return runVoidSink(sink as VoidSink<unknown>, entry)
	}
}
