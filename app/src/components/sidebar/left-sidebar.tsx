import type {DockviewApi} from "dockview-core"
import homeURL from "../../repo/home.ts"
import DocumentList from "./document-list/document-list.tsx"
import "./sidebar.css"

export default function LeftSidebar(props: {dv: DockviewApi}) {
	return (
		<aside class="sidebar sidebar--left">
			<DocumentList root={homeURL()} dv={props.dv} />
		</aside>
	)
}
