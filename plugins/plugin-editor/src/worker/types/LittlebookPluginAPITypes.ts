// todo generate this somehow????
export default /* ts */ `
import {DocHandle} from "@automerge/automerge-repo"
import {StandardSchemaV1} from "@standard-schema/spec"
export as namespace Littlebook
export interface Source<T> {
	id: string
	displayName: string
	category: "filesystem" | "new" | "network"
	"new"(): Promise<{name: string, icon?: string, content: T}>
	import?(file: File): Promise<{name: string, icon?: string, content: T}>
}
export interface View<T> {
	id: string
	icon?: string
	displayName: string
	category: "readonly" | "editor" | "standalone"
	schema: StandardSchemaV1<T>
	render(api: {
		updateStatusItems(items: string[]): void
		registerKeybinding(keybinding: string, action: () => void): void
		isActive(): boolean
		onCleanup(cleanup: () => void): void
		onMount(mount: () => void): void
		handle: DocHandle<T>
		updateName(name: string): void
		onChange(fn: () => {}): void
		updateIndex(): void
		callCommand(command: string, ...args: unknown[]): void
		adoptStylesheet(stylesheet: string): void
		addCSS(css: string): void
	})
}


declare module "@littlebook/plugin-api" {
	export interface Source<T> extends Littlebook.Source<T> {}
	export interface View<T = unknown> extends Littlebook.View<T> {}
	export const littlebook: {
		registerSource(source: Littlebook.Source): void
		registerView(view: Littlebook.View): void
	}
	export default littlebook
}

declare global {
	namespace Littlebook {
		export interface Source<T> extends Littlebook.Source<T> {}
		export interface View<T> extends Littlebook.View<T> {}
	}
	interface Window {
		littlebook: {
			registerSource(source: Littlebook.Source): void
			registerView(view: Littlebook.View): void
		}
	}
}
`
