import {render} from "preact"
import "./style.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import Root from "./pages/root.tsx"
import ErrorPage from "./pages/error.tsx"
import {Card} from "./components/card.tsx"
import {FilesWorkerProvider} from "./files.tsx"
import {Suspense} from "preact/compat"

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
				element: (
					<PanelGroup direction="vertical">
						<Panel defaultSize={50}>
							<Card>top</Card>
						</Panel>
						<PanelResizeHandle />
						<Panel defaultSize={50}>
							<Card>bottom</Card>
						</Panel>
					</PanelGroup>
				),
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
		<RouterProvider router={router} fallbackElement={<div class="spinner" />} />
	</FilesWorkerProvider>,
	document.getElementById("littlebook")!,
)

export function Reserved() {
	return <div>lol !!!</div>
}
