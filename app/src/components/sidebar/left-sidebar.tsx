import "./sidebar.css"
import {homeEntryURL} from "../../repo/home.ts"
import DocumentListWidget from "./document-list/document-list-widget.tsx"

export default function LeftSidebar() {
	// todo add pinned directories
	return (
		<aside class="sidebar sidebar--left">
			<DocumentListWidget url={homeEntryURL()} />
		</aside>
	)
}
