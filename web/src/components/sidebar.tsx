import "./sidebar.css"
import {Card, CardLink} from "./card.tsx"
import {useEvolu, useQuery} from "@evolu/react"
import {NameString, queries, type Database} from "../evolu.ts"
import {Schema} from "@effect/schema"

export default function Sidebar() {
	const evolu = useEvolu<Database>()
	const {rows: projects} = useQuery(queries.all.projects)

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
					evolu.create("projects", {
						name: Schema.decodeSync(NameString)(
							Math.random().toString(36).slice(2).replace(/\d+/g, ""),
						),
					})
				}}>
				{projects.map(project => {
					return (
						<CardLink
							icon="🗃️"
							title={project.name || ""}
							key={project.id}
							href={`/projects/${project.id}`}
						/>
					)
				})}
			</Card>
		</aside>
	)
}
