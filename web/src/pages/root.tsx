import {Outlet} from "react-router-dom"
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import Sidebar from "../components/sidebar.tsx"
import {Badge} from "../pwa.tsx"
import * as am from "../automerge.ts"
import {
	isValidAutomergeUrl,
	Repo,
	Counter,
	type DocHandle,
} from "@automerge/automerge-repo"
import {useMemo} from "preact/hooks"
import {RepoContext} from "@automerge/automerge-repo-react-hooks"
export default function Root() {
	const {auth, repo} = useMemo(() => am.connect(), [])
	if (!auth) {
		return <div />
	}
	// todo move all this to am.ts
	const storedSpaceUrl = localStorage.getItem("space-url")
	let spaceHandle: DocHandle<Littlebook.Space>
	if (isValidAutomergeUrl(storedSpaceUrl)) {
		spaceHandle = repo.find(storedSpaceUrl)
	} else {
		spaceHandle = repo.create<Littlebook.Space>()
		const spaceId = spaceHandle.documentId as string as Littlebook.SpaceId
		const projectHandle = repo.create<Littlebook.Project>()
		const projectId = projectHandle.documentId as string as Littlebook.ProjectId
		const inboxHandle = repo.create<Littlebook.Folder>()
		const inboxId = inboxHandle.documentId as string as Littlebook.InboxId
		const fileHandle = repo.create<Littlebook.File>()
		const fileId = fileHandle.documentId as string as Littlebook.FileId
		spaceHandle.change(space => {
			space.id = spaceId
			space.type = "space"
			space.inboxId = inboxId
			space.children = [
				projectHandle.documentId as string as Littlebook.ProjectId,
			]
		})
		projectHandle.change(project => {
			project.id = projectId
			project.type = "project"
			project.name = Math.random().toString(36).slice(2).replace(/\d/g, "")
			project.children = [fileId]
		})
		const contentHandle = repo.create<Littlebook.Content>()
		const contentId = contentHandle.documentId as string as Littlebook.ContentId
		const fileName = Math.random().toString(36).slice(2).replace(/\d/g, "")
		fileHandle.change(file => {
			file.contentId = contentId
			file.id = fileId
			file.ext = "txt"
			file.name = fileName
		})
		contentHandle.change(content => {
			content.id = contentId
			content.name = fileName
			content.ext = "txt"
			content.bytes = new Uint8Array([
				0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64,
			])
		})
	}

	const spaceUrl = spaceHandle.url
	localStorage.setItem("space-url", spaceUrl)

	return (
		<RepoContext.Provider value={repo}>
			<PanelGroup autoSaveId="root" direction="horizontal">
				<Panel defaultSize={25} minSize={10} maxSize={40}>
					<Badge />
					<Sidebar />
				</Panel>
				<PanelResizeHandle />
				<Panel>
					<main id="main">
						<Outlet />
					</main>
				</Panel>
				<PanelResizeHandle />
				<Panel defaultSize={25} minSize={10} maxSize={40}>
					<Sidebar />
				</Panel>
			</PanelGroup>
		</RepoContext.Provider>
	)
}
