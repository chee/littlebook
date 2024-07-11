import type {ParentComponent} from "solid-js"
import "./sidebar.scss"
import clsx from "clsx"

let Sidebar: ParentComponent<{
	open: () => boolean
	class?: string
	which: "primary" | "secondary"
}> = props => (
	<aside
		aria-expanded={props.open()}
		class={clsx("sidebar", props.class, props.which)}>
		{props.children}
	</aside>
)

export default Sidebar
