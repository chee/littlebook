import {DocHandle} from "@automerge/automerge-repo"

export namespace Littlebook {
	export interface Source {
		id: string
		displayName: string
		category: "filesystem" | "new" | "network"
		"new"(): Promise<[unknown, {name: string}] | [unknown]>
		import?(file: File): Promise<unknown>
	}
	export interface View<T> {
		id: string
		icon?: string
		displayName: string
		category: "readonly" | "editor" | "standalone"
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
}
declare module "@littlebook/plugin-api" {
	export interface Source extends Littlebook.Source {}
	export interface View<T = unknown> extends Littlebook.View<T> {}
	const littlebook: {
		registerSource(source: Littlebook.Source): void
		registerView(view: Littlebook.View): void
	}
	export default littlebook
}
declare global {
	interface Window {
		littlebook: {
			registerSource(source: Littlebook.Source): void
			registerView(view: Littlebook.View): void
		}
	}
}
