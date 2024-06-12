import type {FunctionalComponent} from "preact"
import type {SpaceState} from "../../space/space-state.tsx"
import "./sidebar.scss"

const Sidebar: FunctionalComponent<{
	state: SpaceState["layout"]["sidebars"]["primary" | "secondary"]
}> = ({state, children}) => (
	<aside aria-expanded={state.open} class="sidebar">
		{children}
	</aside>
)

export default Sidebar
