import "./sidebar.css"
import {Card, CardLink} from "./card.tsx"
import {useDocument, useRepo} from "@automerge/automerge-repo-react-hooks"
import createProject from "../automerge/projects/create-project.ts"
import {useLocalState} from "../hooks/local-state.ts"
import ProjectLink from "./project-link.tsx"

// todo this should be Navbar or something, and Sidebar should be the generic
// container so that the other side can have one too
export default function Sidebar() {
	const localState = useLocalState()
	const repo = useRepo()
	const [space, changeSpace] = useDocument<lb.Space>(localState.spaceId)

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
						const project = createProject(repo)
						changeSpace(space => {
							space.projects.push(project.documentId as lb.ProjectId)
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
		</aside>
	)
}
