import type {Source} from "./source.js"
import type {View} from "./view.js"
import type {Sink} from "./sink.js"

export interface PluginAPI {
	registerSink<T>(sink: Sink<T>): void
	registerSource<T>(source: Source<T>): void
	registerView<T>(view: View<T>): void
}
