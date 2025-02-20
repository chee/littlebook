import type {Source} from "./source.js"
import type {View} from "./view.js"
import type {Sink} from "./sink.js"

export interface PluginAPI {
	registerEditor<T>(editor: View<T>): void
	registerSource<T>(coder: Source<T>): void
	registerSink<T>(publisher: Sink<T>): void
}
