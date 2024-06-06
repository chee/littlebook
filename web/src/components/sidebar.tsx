import "./sidebar.css"
import {Card, CardLink} from "./card.tsx"
import {
	useDocument,
	useDocuments,
	useRepo,
} from "@automerge/automerge-repo-react-hooks"
import createProject from "../automerge/projects/create-project.ts"
import type {lb} from "../types.ts"
import {useLocalState} from "../hooks/local-state.ts"

export default function Sidebar() {
	const localState = useLocalState()
	const repo = useRepo()
	const [space, changeSpace] = useDocument<lb.Space>(localState.spaceId)
	const projects = useDocuments<lb.Project>(space?.children)

	return (
		<aside class="sidebar">
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
						space.children.push(project.documentId as lb.ProjectId)
					})
				}}>
				{Object.entries(projects).map(([id, p]) => (
					<CardLink
						key={id}
						icon={p.icon || "🦔"}
						title={p.name?.val}
						href={`/projects/${id}`}
					/>
				))}
			</Card>
		</aside>
	)
}
