import {createEffect, createSignal, type Component, type JSX} from "solid-js"

const ShadowBox: Component<{
	children: (el: ShadowRoot) => JSX.Element | void
}> = props => {
	let div: HTMLDivElement

	const [shadow, setShadow] = createSignal<ShadowRoot>()

	createEffect(() => {
		if (props.children && shadow()) {
			props.children(shadow())
		}
	})

	return <shadow-box ref={div!} prop:setShadow={setShadow} />
}

class ShadowBoxElement extends HTMLElement {
	setShadow: (shadow: ShadowRoot) => void
	constructor() {
		super()
		this.style.display = "contents"
	}
	connectedCallback() {
		if (!this.shadowRoot) {
			try {
				this.setShadow(
					this.attachShadow({
						mode: "closed",
						delegatesFocus: true,
					})
				)
			} catch (error) {
				console.warn("failed to attach shadow root", error)
			}
		}
		if (this.shadowRoot) {
			this.setShadow(this.shadowRoot)
		}
	}
}
if (!customElements.get("shadow-box")) {
	customElements.define("shadow-box", ShadowBoxElement)
}

declare module "solid-js" {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			"shadow-box": JSX.IntrinsicElements["div"] & {
				"prop:setShadow": ShadowBoxElement["setShadow"]
			}
		}
	}
}

export default ShadowBox
