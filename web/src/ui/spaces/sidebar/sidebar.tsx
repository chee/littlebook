// import type {FunctionalComponent} from "preact
// import type {SpaceState} from "../../littlebook/spaces/space-state.tsx"
import type {ParentComponent} from "solid-js"
import cl from "../../lib/cl.ts"
import "./sidebar.scss"

const Sidebar: ParentComponent<{
	state: SpaceState["layout"]["sidebars"]["primary" | "secondary"]
	class?: string
}> = ({state, children, ...props}) => (
	<aside aria-expanded={state.open} class={cl("sidebar", props.class)}>
		{children}
	</aside>
)

export default Sidebar
