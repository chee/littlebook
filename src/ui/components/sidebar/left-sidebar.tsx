import "./sidebar.css"
import DocumentListWidget from "./document-list/document-list-widget.tsx"
import {useUserDocContext} from ":/domain/user/user.ts"

export default function LeftSidebar() {
	// todo add pinned directories
	const user = useUserDocContext()
	const homeEntryURL = () => user()?.home
	return (
		<aside class="sidebar sidebar--left">
			<DocumentListWidget url={homeEntryURL()} />
		</aside>
	)
}
