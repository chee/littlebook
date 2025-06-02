import "./shadow.css"
import resolveStyles from ":/ui/components/view/resolveStyles.ts"
import type {ViewStylesType} from "@littlebook/plugin-api/types/view.ts"
import {
	createEffect,
	createSignal,
	onCleanup,
	type Accessor,
	type JSX,
} from "solid-js"
import {render} from "solid-js/web"

export interface ShadowsProps {
	children(props: ShadowsChildrenProps): JSX.Element
}

export type ShadowsChildrenProps = {
	shadow(): ShadowRoot
	adoptStyles(...styles: (ViewStylesType | ViewStylesType[])[]): Promise<void>
}

export function Shadows(props: ShadowsProps) {
	const [host, setHost] = createSignal<HTMLElement>()
	const [shadow, setShadow] = createSignal<ShadowRoot>()
	createEffect(() => {
		if (host()) {
			setShadow(
				host()!.attachShadow({
					mode: "open",
					delegatesFocus: true,
				}),
			)
		} else {
			console.warn("host not ready")
		}
	})

	async function adoptStyles(
		...styles: (ViewStylesType | ViewStylesType[])[]
	) {
		const css = await resolveStyles(styles.flat())
		const sheet = new CSSStyleSheet()
		// todo this will not replace old stylesheets, so if the same style is adopted twice there will be overlapping styles
		// that's a shame. but otherwise i need some kind of unique identifier for the sheet, to replace it.
		// todo maybe adoptStyles should be like adoptStyles(id: string, ...styles: ViewStylesType[])
		// then maybe i can replaceSync the sheet by id? something?
		// this is only a hotreload consideration during PLuginDev
		shadow()!.adoptedStyleSheets.push(sheet)
		sheet.replaceSync(css)
	}

	const [hostConnected, setHostConnected] = createSignal(false)

	createEffect(() => {
		const hostElement = host()
		if (!hostElement) return

		if (hostElement.isConnected) {
			setHostConnected(true)
			return
		}

		const observer = new MutationObserver(mutations => {
			for (const m of mutations) {
				for (const node of Array.from(m.addedNodes)) {
					if (
						node === hostElement ||
						(node instanceof Node && node.contains(hostElement))
					) {
						observer.disconnect()
						setHostConnected(true)
						return
					}
				}
			}
		})

		observer.observe(document.documentElement, {
			childList: true,
			subtree: true,
		})

		onCleanup(() => observer.disconnect())
	})

	const dom = () =>
		hostConnected() &&
		shadow()?.ownerDocument?.defaultView &&
		props.children({
			shadow: shadow as Accessor<ShadowRoot>,
			adoptStyles,
		})

	createEffect(() => dom() && render(dom, shadow()!))

	return <shadow-root ref={setHost} />
}

export function useShadowRoot() {}

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements {
			"shadow-root": {
				ref?: HTMLDivElement | ((el: HTMLDivElement) => void)
				style?: JSX.CSSProperties
				children?: JSX.Element
			}
		}
	}
}
