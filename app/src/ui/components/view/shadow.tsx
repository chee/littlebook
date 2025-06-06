import "./shadow.css"
import resolveStyles from ":/ui/components/view/resolveStyles.ts"
import type {ViewID, ViewStylesType} from "@littlebook/plugin-api/types/view.ts"
import {
	createEffect,
	createSignal,
	onCleanup,
	type Accessor,
	type JSX,
} from "solid-js"
import {render} from "solid-js/web"

export interface ShadowsProps {
	// id: ViewID
	children(props: ShadowsChildrenProps): JSX.Element
}

export type ShadowsChildrenProps = {
	shadow(): ShadowRoot
	/**
	 *
	 * adopt styles registered in the view's styles array
	 */
	setViewStyles(
		...styles: (ViewStylesType | ViewStylesType[])[]
	): Promise<void>
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

	async function setViewStyles(
		...styles: (ViewStylesType | ViewStylesType[])[]
	) {
		const rul = `💖 { }`
		const css = await resolveStyles(styles.flat())
		let consumed = false
		for (const sheet of shadow()!.adoptedStyleSheets) {
			if (sheet.cssRules.item(0)?.cssText == rul) {
				sheet.replaceSync(css)
				consumed = true
				break
			}
		}
		if (consumed) return
		const sheet = new CSSStyleSheet()
		sheet.replaceSync(css)
		sheet.insertRule(rul, 0)
		shadow()!.adoptedStyleSheets.push(sheet)
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
			setViewStyles,
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
