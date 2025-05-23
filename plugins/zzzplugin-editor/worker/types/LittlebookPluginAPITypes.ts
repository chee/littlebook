// todo generate this somehow????
export default /* ts */ `
declare namespace Littlebook {
	declare interface Source {
		id: string
		displayName: string
		category: "filesystem" | "new" | "network"
		"new"(): Promise<[unknown, {name: string}] | [unknown]>
		import?(file: File): Promise<unknown>
	}
	declare interface View {
		id: string
		displayName: string
		category: "readonly" | "editor" | "standalone"
		render(api: {
				updateStatusItems(items: string[]): void
				registerKeybinding(keybinding: string, action: () => void): void
				isActive(): boolean
				onCleanup(cleanup: () => void): void
				onMount(mount: () => void): void
				doc(): unknown
				handle: {
							doc(): unknown
							updateName(name: string): void
				}
				updateName(name: string): void
				onChange(fn: () => {}): void
				updateIndex(): void
				callCommand(command: string, ...args: unknown[]): void
				adoptStylesheet(stylesheet: string): void
				addCSS(css: string): void
		})
	}
}
declare interface Window {
	declare littlebook: {
		registerSource(source: Littlebook.Source): void
		registerView(view: Littlebook.View): void
	}
}
`
