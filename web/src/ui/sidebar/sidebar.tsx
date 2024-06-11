import "./sidebar.css"
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

// todo this should be Navbar or something, and Sidebar should be the generic
// container so that the other side can have one too
export default function Sidebar({
	toggle,
	isCollapsed,
}: {toggle: () => void; isCollapsed: boolean}) {
	const lb = useLittlebookAPI()
	const localState = useLocalState()
	const [space, changeSpace] = useDocument<lb.Space>(localState.spaceId)
	const {team} = useAuth()

	const [editingProjectId, setEditingProjectId] = useState<
		lb.ProjectId | undefined
	>()

	useHotkeys(
		"escape",
		() => {
			console.log("i am escaping")
			setEditingProjectId(undefined)
		},
		{
			enableOnFormTags: true,
		},
	)

	return (
		<aside class="sidebar pr-2 pl-2 block has-background-light">
			<header class="sidebar-header level is-mobile has-background-light mt-2">
				<div class="level-left" />
				<div class="level-right">
					<div class="level-item pr-0">
						<SidebarToggle light toggle={toggle} isCollapsed={isCollapsed} />
					</div>
				</div>
			</header>
			<nav>
				<Card padding={0}>
					<div class="menu">
						<ul class="menu-list">
							<li>
								<CardLink icon="📥" title="inbox" href="/inbox" />
							</li>
						</ul>
					</div>
				</Card>
				<Card padding={0}>
					<div class="menu">
						<ul class="menu-list">
							<li>
								<CardLink icon="⭐" title="today" href="/today" />
							</li>
							<li>
								<CardLink icon="📆" title="upcoming" href="/upcoming" />
							</li>
							<li>
								<CardLink icon="🗃️" title="someday" href="/someday" />
							</li>
						</ul>
					</div>
				</Card>
				<Card
					padding={0}
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
					<div class="menu">
						<ul class="menu-list">
							{space?.projects.map(id => (
								<li key={id}>
									<ProjectLink
										id={id}
										editingId={editingProjectId}
										setEditingId={setEditingProjectId}
									/>
								</li>
							))}
						</ul>
					</div>
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
					class="button is-danger"
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
