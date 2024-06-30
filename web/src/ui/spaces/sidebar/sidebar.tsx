import type {ParentComponent} from "solid-js"
import cl from "../../lib/cl.ts"
import "./sidebar.scss"

const Sidebar: ParentComponent<{
	open: () => boolean
	class?: string
	which: "primary" | "secondary"
}> = props => (
	<aside
		aria-expanded={props.open()}
		class={cl("sidebar", props.class, props.which)}>
		{props.children}
	</aside>
)

export default Sidebar
