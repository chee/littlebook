import ContentEditor from "../files/content-editor.tsx"
import InfoPanel from "../files/info-panel.tsx"
import MetadataViewer from "../files/metadata-viewer.tsx"
import ProjectFileBrowser from "./project-file-browser.tsx"
import "./projects.scss"

export default function ProjectPage() {
	return (
		<div class="flex grow">
			<div class="flex column grow">
				<ProjectFileBrowser />
				<ContentEditor />
			</div>
			<aside class="px-2 flex">
				<InfoPanel />
				<MetadataViewer />
			</aside>
		</div>
	)
}

/**
 * 		<PanelGroup class="grow flex" direction="row">
			<Panel
				minSize={75}
				initialSize={62}
				class="pr-4 pl-8"
				id={`${params.projectId}-main`}>
				<PanelGroup direction="column">
					<Panel initialSize={38} minSize={10} id={`${params.projectId}-fb`}>
						<ProjectFileBrowser />
					</Panel>
					<ResizeHandle />
					<Panel initialSize={62} minSize={5} id={`${params.projectId}-cv`}>
						<ContentViewer />
					</Panel>
				</PanelGroup>
			</Panel>
			<ResizeHandle />
			<Panel initialSize={19} minSize={5} id="metapanel">
				<aside class="px-2">
					<InfoPanel />
					<MetadataViewer />
				</aside>
			</Panel>
		</PanelGroup>
 */
