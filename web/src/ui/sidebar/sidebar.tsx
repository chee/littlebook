import "./sidebar.css"
import {Card, CardLink} from "../card/card.tsx"
import {useDocument, useRepo} from "@automerge/automerge-repo-react-hooks"
import {useLocalState} from "../../auth/use-local-state.ts"
import ProjectLink from "./project-link.tsx"
import createDeviceInvitation from "../../auth/invitations/create-device-invitation.ts"
import {removeDirectory} from "../opfs.ts"
import {useAuth} from "../../auth/auth-hooks.ts"
import {useLittlebookAPI} from "../../api/use-littlebook-api.ts"

// todo this should be Navbar or something, and Sidebar should be the generic
// container so that the other side can have one too
export default function Sidebar() {
	const lb = useLittlebookAPI()
	const localState = useLocalState()
	const repo = useRepo()
	const [space, changeSpace] = useDocument<lb.Space>(localState.spaceId)
	const {team} = useAuth()
	return (
		<aside class="sidebar">
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
					action={() => {
						const projectHandle = lb.projects.createHandle()
						projectHandle.doc().then(prj => {
							prj && changeSpace(lb.spaces.addProject(prj.id))
						})
					}}>
					{space?.projects.map(id => (
						<ProjectLink key={id} id={id} />
					))}
					{space?.areas.map(id => {
						return <div key={id}>id</div>
					})}
				</Card>
			</nav>
			<Card>
				<button
					type="button"
					style="width: 100%"
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
			</Card>
		</aside>
	)
}
