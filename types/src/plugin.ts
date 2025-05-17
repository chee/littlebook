import type {Source} from "./source.js"
import type {View} from "./view.js"
import type {Command} from "./command.js"

export interface PluginAPI {
	registerCommand<T>(command: Command): void
	registerSource<T>(source: Source<T>): void
	registerView<T>(view: View<T>): void

	get activeView(): View | undefined
}

declare global {
	interface globalThis {
		littlebook: PluginAPI
	}
}
