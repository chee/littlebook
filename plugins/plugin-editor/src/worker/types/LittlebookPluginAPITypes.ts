// todo generate this somehow????
export default /* ts */ `
import {DocHandle} from "@automerge/automerge-repo"
import {StandardSchemaV1} from "@standard-schema/spec"
export namespace Littlebook {
	export type Source<T> = {
		id: string
		displayName: string
	} & (
		| {
				category: "filesystem"
				import(
					file: File
				): Promise<{name: string; icon?: string; content: T}>
		  }
		| {
				category: "new"
				"new"(): Promise<{name: string; icon?: string; content: T}>
		  }
	)

	type StylesType = string | Promise<string> | Promise<{default: string}>
	type ViewAPIBase<T> = {
		updateStatusItems(items: string[]): void
		registerKeybinding(
			keybinding: string,
			action: (event: KeyboardEvent) => void
		): void
		isActive(): boolean
		onCleanup(cleanup: () => void): void
		onMount(mount: () => void): void
		toast: {
			show(
				title: JSX.Element,
				opts?: {
					body?: JSX.Element
					link?: JSX.Element
					modifiers?: BembyModifier | BembyModifiers
				}
			): void
		}
	}
	export type View<T> = {
		id: string
		icon?: string
		displayName: string
		schema: StandardSchemaV1<T>
		styles?: StylesType | StylesType[]
		render(api: {
			updateStatusItems(items: string[]): void
			registerKeybinding(keybinding: string, action: () => void): void
			isActive(): boolean
			onCleanup(cleanup: () => void): void
			onMount(mount: () => void): void
			handle: DocHandle<T>
			updateName(name: string): void
			onChange(fn: () => {}): void
		})
	} & (
		| {
				category: "readonly"
				render(
					api: {
						doc(): Shape
						onChange(fn: () => void): void
					} & ViewAPIBase<T>
				)
		  }
		| {
				category: "editor"
				render(
					api: {
						handle: DocHandle<Shape>
						updateName(name: string): void
					} & ViewAPIBase<T>
				)
		  }
		| {category: "standalone"; render(api: ViewAPIBase<T>)}
	)
	export function registerSource<T>(source: Littlebook.Source<T>): void
	export function registerView<T>(view: Littlebook.View<T>): void
}

export default Littlebook
export type Source<T> = Littlebook.Source<T>
export type View<T> = Littlebook.View<T>

declare global {
	interface Window {
		littlebook: {
			registerSource(source: Littlebook.Source): void
			registerView(view: Littlebook.View): void
		}
	}
}
`
