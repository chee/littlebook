import "./sidebar.css"
import {Card, CardLink} from "./card.tsx"
import {useDocument, useDocuments} from "@automerge/automerge-repo-react-hooks"
import {Littlebook} from "@littlebook/types"

export default function Sidebar() {
	const [space, changeSpace] = useDocument<Littlebook.Space>(
		localStorage.getItem("space-url"),
	)
	const projects = useDocuments<Littlebook.Project>(space?.children)

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
			<Card title="projects">
				{Object.values(projects).map(p => (
					<CardLink
						key={p.id}
						icon={p.icon || "🦔"}
						title={p.name}
						href={`/projects/${p.id}`}
					/>
				))}
			</Card>
		</aside>
	)
}
