import type {DockviewApi} from "dockview-core"
import homeURL from "../../repo/home.ts"
import HomeWidget from "./document-list/document-list.tsx"
import "./sidebar.css"

export default function LeftSidebar(props: {dockviewAPI: DockviewApi}) {
	return (
		<aside class="sidebar sidebar--left">
			<HomeWidget root={homeURL()} dockviewAPI={props.dockviewAPI} />
		</aside>
	)
}
