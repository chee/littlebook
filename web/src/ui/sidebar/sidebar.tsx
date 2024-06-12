import {Card, CardLink} from "../card/card.tsx"
import {useDocument, useRepo} from "@automerge/automerge-repo-react-hooks"
import {useLocalState} from "../../auth/use-local-state.ts"
import ProjectLink from "./project-link.tsx"
import createDeviceInvitation from "../../auth/invitations/create-device-invitation.ts"
import {removeDirectory} from "../opfs.ts"
import {useAuth} from "../../auth/auth-hooks.ts"
import {useLittlebookAPI} from "../../api/use-littlebook-api.ts"
import SidebarToggle from "./sidebar-toggle.tsx"
import {useHotkeys} from "react-hotkeys-hook"
import {useState} from "preact/hooks"
import cl from "../cl.ts"
import {useSpaceUIState} from "../space-ui-state.tsx"

// todo this should be Navbar or something, and Sidebar should be the generic
// container so that the other side can have one too
export default function PrimarySidebar() {
	const ui = useSpaceUIState()
	const sidebar = ui.layout.sidebars.primary
	const lb = useLittlebookAPI()
	const localState = useLocalState()
	const [space, changeSpace] = useDocument<lb.Space>(localState.spaceId)
	const {team} = useAuth()

	return (
		<aside
			aria-expanded={sidebar.open}
			class="sidebar block top-0 bottom-0 p-4 overflow-y-auto
			bg-cover-100 h-[95vh] w-full dark:bg-black dark:text-white">
			<nav>
				<Card>
					<CardLink icon="📥" title="inbox" href="/inbox" />
				</Card>
				<Card>
					<CardLink icon="⭐" title="today" href="/today" />
					<CardLink icon="📆" title="upcoming" href="/upcoming" />
					<CardLink icon="🗃️" title="someday" href="/someday" />
				</Card>
				<Card
					title="projects"
					headerAction={{
						label: "create project",
						icon: "+",
						action() {
							const projectHandle = lb.projects.createHandle()
							projectHandle.doc().then(prj => {
								prj && changeSpace(lb.spaces.addProject(prj.id))
							})
						},
					}}>
					{space?.projects.map(id => (
						<ProjectLink projectId={id} key={id} />
					))}
				</Card>
				{space?.areas.map(id => {
					return (
						<Card
							key={id}
							title="area name"
							headerAction={{
								label: "create project in area",
								icon: "+",
								action() {
									// const projectHandle = lb.projects.createHandle()
									// projectHandle.doc().then(prj => {
									// 	prj && changeSpace(lb.areas.addProject(space.id, prj.id))
									// })
								},
							}}>
							{/* {space?.projects.map(id => (
								<ProjectLink key={id} id={id} />
							))} */}
						</Card>
					)
				})}
			</nav>
			<div class="section">
				<button
					type="button"
					style="width: 100%"
					class="bg-red-600 text-white"
					onClick={() => {
						const answer = window.prompt(
							"are you sure? if so press ok. you can copy this code if you want to try coming back as the same user.",
							createDeviceInvitation(team),
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
					}}>
					destroy session
				</button>
			</div>
		</aside>
	)
}
