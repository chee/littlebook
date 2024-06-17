// import type {FunctionalComponent} from "preact
// import type {SpaceState} from "../../littlebook/spaces/space-state.tsx"
import cl from "../../lib/cl.ts"

const Sidebar: FunctionalComponent<{
	state: SpaceState["layout"]["sidebars"]["primary" | "secondary"]
	class?: string
}> = ({state, children, ...props}) => (
	<aside aria-expanded={state.open} class={cl("sidebar", props.class)}>
		{children}
	</aside>
)

export default Sidebar
