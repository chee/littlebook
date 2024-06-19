// import type {FunctionalComponent} from "preact
// import type {SpaceState} from "../../littlebook/spaces/space-state.tsx"
import type {ParentComponent} from "solid-js"
import cl from "../../lib/cl.ts"
import "./sidebar.scss"

const Sidebar: ParentComponent<{
	open: boolean
	class?: string
}> = props => (
	<aside aria-expanded={props.open} class={cl("sidebar", props.class)}>
		{props.children}
	</aside>
)

export default Sidebar
