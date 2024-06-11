import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import {Card} from "../card/card.tsx"
import {useParams, useSearch} from "wouter-preact"
import ContentViewer from "../contents/content-viewer.tsx"
import {useState} from "preact/hooks"
import {useLittlebookAPI} from "../../api/use-littlebook-api.ts"
import useProject from "../../projects/use-project.ts"
import MetadataViewer from "../../contents/metadata/metadata-viewer.tsx"
import ProjectFileBrowser from "./project-file-browser.tsx"
import InfoPanel from "../../contents/metadata/info-panel.tsx"
import useFile from "../../files/use-file.ts"
import SidebarToggle from "../sidebar/sidebar-toggle.tsx"

export default function ProjectPage({
	sidebarIsCollapsed = false,
	toggleSidebar = () => {},
}) {
	const lb = useLittlebookAPI()

	const {projectId} = useParams<{projectId: lb.ProjectId}>()
	const [project, changeProject] = useProject(projectId)
	if (!project) {
		return <div />
	}

	// const project = lb.projects.get(projectId as lb.ProjectId)
	const search = new URLSearchParams(useSearch())
	const fileId = (search.get("file") as lb.FileId) || undefined
	const [selectedFileId, setSelectedFileId] = useState<lb.FileId | undefined>(
		fileId as lb.FileId,
	)

	const [selectedFile, changeSelectedFile] = useFile(selectedFileId)

	return (
		<>
			<header class="main-view-header navbar is-light">
				<div class="navbar-start">
					{sidebarIsCollapsed && (
						<div class="navbar-item pl-0">
							<SidebarToggle
								light
								toggle={toggleSidebar}
								isCollapsed={sidebarIsCollapsed}
							/>
						</div>
					)}
				</div>
			</header>

			<PanelGroup direction="horizontal" autoSaveId={"project+" + projectId}>
				<Panel defaultSize={62}>
					<PanelGroup
						direction="vertical"
						autoSaveId={"project+" + projectId + "-browsers"}>
						<Panel defaultSize={38} minSize={5}>
							<ProjectFileBrowser
								projectId={projectId}
								setSelectedFileId={setSelectedFileId}
								selectedFileId={selectedFileId}
							/>
						</Panel>
						<PanelResizeHandle
							class="has-background-light-90"
							style={{height: "1em"}}
						/>
						<Panel defaultSize={62} minSize={5}>
							{selectedFileId && <ContentViewer fileId={selectedFileId} />}
						</Panel>
					</PanelGroup>
				</Panel>
				<PanelResizeHandle />
				<Panel defaultSize={19} minSize={5}>
					<aside class="section sidebar sidebar--file-panel pr-2 pl-2 block has-background-light">
						{selectedFileId && <InfoPanel fileId={selectedFileId} />}
						{selectedFileId && <MetadataViewer fileId={selectedFileId} />}
					</aside>
				</Panel>
			</PanelGroup>
		</>
	)
}
