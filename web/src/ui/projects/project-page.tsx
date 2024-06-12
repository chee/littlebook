import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import {useParams, useSearch} from "wouter-preact"
import ContentViewer from "../contents/content-viewer.tsx"
import {useEffect, useState} from "preact/hooks"
import useProject from "../../projects/use-project.ts"
import MetadataViewer from "../../contents/metadata/metadata-viewer.tsx"
import ProjectFileBrowser from "./project-file-browser.tsx"
import InfoPanel from "../../contents/metadata/info-panel.tsx"
import cl from "../cl.ts"
import {useSpaceState} from "../space/space-state.tsx"

export default function ProjectPage() {
	const ui = useSpaceState()
	const projectId = ui.projects.selected.value

	return (
		<PanelGroup
			class="grow flex"
			direction="horizontal"
			autoSaveId={"project+" + projectId}>
			<Panel defaultSize={62} class="p-4 px-1">
				<PanelGroup
					direction="vertical"
					autoSaveId={"project+" + projectId + "-browsers"}>
					<Panel defaultSize={38} minSize={5}>
						<ProjectFileBrowser />
					</Panel>
					<PanelResizeHandle class="bg-paper-100 h-2" />
					<Panel defaultSize={62} minSize={5}>
						<ContentViewer />
					</Panel>
				</PanelGroup>
			</Panel>
			<PanelResizeHandle />
			<Panel defaultSize={19} minSize={5}>
				<aside class="px-2">
					<InfoPanel />
					<MetadataViewer />
				</aside>
			</Panel>
		</PanelGroup>
	)
}
