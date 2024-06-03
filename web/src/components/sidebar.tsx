import "./sidebar.css"
import {Card, CardLink} from "./card.tsx"

export default function Sidebar() {
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
			<Card title="projects" />
		</aside>
	)
}
