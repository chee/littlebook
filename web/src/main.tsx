import {render} from "preact"
import "./style.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import Root from "./pages/root.tsx"
import ErrorPage from "./pages/error.tsx"
import {Card} from "./components/card.tsx"
import {FilesWorkerProvider} from "./files.tsx"
import {Suspense} from "preact/compat"
import * as am from "./automerge.ts"
import {
	isValidAutomergeUrl,
	Repo,
	Counter,
	type DocHandle,
} from "@automerge/automerge-repo"
import type {Littlebook} from "@littlebook/types"
import {RepoContext} from "@automerge/automerge-repo-react-hooks"
import ProjectPage from "./pages/project.tsx"

const repo = am.repo()

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
		project.name = "hehex"

		project.children = [fileId]
	})
	const contentHandle = repo.create<Littlebook.Content>()
	const contentId = contentHandle.documentId as string as Littlebook.ContentId
	fileHandle.change(file => {
		file.contentId = contentId
		file.id = fileId
		file.ext = "txt"
		file.name = "jeeves"
	})
	contentHandle.change(content => {
		content.id = contentId
		content.name = "jeeves"
		content.ext = "txt"
		content.bytes = new Uint8Array([
			0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64,
		])
	})
}

const spaceUrl = spaceHandle.url
localStorage.setItem("space-url", spaceUrl)

const router = createBrowserRouter([
	{
		element: (
			<Suspense fallback={<div class="loading" />}>
				<Root />
			</Suspense>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Reserved />,
			},
			{
				path: "/inbox",
				element: <Reserved />,
			},
			{
				path: "/today",
				element: <Reserved />,
			},
			{
				path: "/upcoming",
				element: <Reserved />,
			},
			{
				path: "/someday",
				element: <Reserved />,
			},
			{
				path: "/areas/:areaId",
				element: <Reserved />,
			},
			{
				path: "/areas/:areaId/projects/*",
				element: <Reserved />,
			},
			{
				path: "/projects/:projectId/*",
				element: <ProjectPage />,
			},
			{
				path: "/contexts/:contextId",
				element: <Reserved />,
			},
			{
				path: "/tags/:tagId",
				element: <Reserved />,
			},
		],
	},
])

render(
	<FilesWorkerProvider>
		<RepoContext.Provider value={repo}>
			<Card>
				<button
					type="button"
					onClick={() => {
						localStorage.setItem(
							"space-url",
							window.prompt("space-url", spaceUrl)!,
						)
						location.reload()
					}}>
					url
				</button>
			</Card>
			<RouterProvider
				router={router}
				fallbackElement={<div class="spinner" />}
			/>
		</RepoContext.Provider>
	</FilesWorkerProvider>,
	document.getElementById("littlebook")!,
)

export function Reserved() {
	return <div>lol !!!</div>
}
