import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import Sidebar from "./sidebar.tsx"
import {Badge} from "../pwa.tsx"
import type {FC} from "preact/compat"
import "./littlebook.css"
import Header from "./header.tsx"
import {Switch, Route, useRoute} from "wouter-preact"
import ProjectPage from "../pages/project.tsx"
import createDeviceInvitation from "../automerge/invitations/create-device-invitation.ts"
import {removeDirectory} from "../opfs.ts"
import {useAuth} from "../hooks/auth.ts"

const Littlebook: FC = () => {
	const [yes] = useRoute("/destroy")
	const auth = useAuth()
	if (yes) {
		const answer = window.prompt(
			"are you sure? if so press ok. you can copy this code if you want to try coming back as the same user.",
			createDeviceInvitation(auth.team),
		)
		if (answer) {
			Promise.all([
				removeDirectory(),
				indexedDB.deleteDatabase("automerge"),
			]).then(() => {
				localStorage.clear()
				location.reload()
			})
		}
	}
	return (
		<PanelGroup direction="vertical" autoSaveId="littlebook">
			<Header />
			<PanelGroup direction="horizontal">
				<Panel defaultSize={19.1} minSize={10} maxSize={40}>
					<Sidebar />
				</Panel>
				<PanelResizeHandle />
				<Panel defaultSize={80.9}>
					<Badge />
					<main id="main">
						<Switch>
							{/* todo /inbox etc */}
							<Route
								component={ProjectPage}
								path="/projects/:slug/:projectId"
							/>
						</Switch>
					</main>
				</Panel>
			</PanelGroup>
		</PanelGroup>
	)
}

export default Littlebook
