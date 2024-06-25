import InfoPanel from "../files/info-panel.tsx"
import MetadataViewer from "../files/metadata-viewer.tsx"
import Sidebar from "../spaces/sidebar/sidebar.tsx"
import ProjectFileBrowser from "./project-file-browser.tsx"
import "./projects.scss"
import sidebarState from "../spaces/sidebar/sidebar-state.ts"

import ContentViewer from "../files/content-viewer.tsx"

export default function ProjectPage() {
	const [sidebar] = sidebarState

	return (
		<div class="flex grow">
			<div class="flex column grow">
				<div class="flex grow file-browser-area">
					<ProjectFileBrowser />
				</div>
				<ContentViewer />
			</div>
			<Sidebar open={sidebar.secondary} which="secondary">
				<InfoPanel />
				<MetadataViewer />
			</Sidebar>
		</div>
	)
}
