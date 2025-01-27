import HomeWidget from "./document-list/document-list.tsx"
import "./sidebar.css"

export default function LeftSidebar() {
	return (
		<aside class="sidebar sidebar--left">
			<HomeWidget />
		</aside>
	)
}
