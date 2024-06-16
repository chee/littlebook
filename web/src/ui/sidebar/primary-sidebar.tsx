import {Card, CardLink} from "../elements/card/card.tsx"
import {useDocument} from "@automerge/automerge-repo-react-hooks"
import {useLocalState} from "../auth/use-local-state.ts"
import ProjectLink from "./project-link.tsx"
import {useLittlebookAPI} from "../../api/use-littlebook-api.ts"
import {useSpaceState} from "../space/space-state.tsx"
import Sidebar from "../elements/sidebar/sidebar.tsx"

// todo this should be Navbar or something, and Sidebar should be the generic
// container so that the other side can have one too
export default function PrimarySidebar() {
	const ui = useSpaceState()
	const {shareId} = ui.space

	const sidebar = ui.layout.sidebars.primary

	const lb = useLittlebookAPI()

	const localState = useLocalState()

	const [space, changeSpace] = useDocument<lb.Space>(localState.spaceId)
	if (!space) {
		return <div>no space</div>
	}

	return (
		<Sidebar state={sidebar} class="pr-6">
			<Card>
				<CardLink
					icon="📥"
					title="inbox"
					// href={getRoute({shareId: shareId.value, page: "inbox"})}
					href="/"
				/>
			</Card>
			<Card>
				<CardLink
					icon="⭐"
					title="today"
					// href={getRoute({shareId: shareId.value, page: "today"})}
					href="/"
				/>
				<CardLink
					icon="📆"
					title="upcoming"
					// href={getRoute({shareId: shareId.value, page: "upcoming"})}
					href="/"
				/>
				<CardLink
					icon="🗃️"
					title="someday"
					// href={getRoute({shareId: shareId.value, page: "someday"})}
					href="/"
				/>
			</Card>
			<Card
				title="projects"
				headerAction={{
					label: "create project",
					icon: "+",
					action() {
						const projectHandle = lb.projects.createHandle()
						projectHandle.doc().then(prj => {
							if (prj) {
								changeSpace(lb.spaces.addProject(prj.id))
								setTimeout(() => {
									// route({
									// 	shareId: ui.space.shareId.value,
									// 	project: prj,
									// })
									ui.projects.renaming.value = prj.id
								})
							}
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
		</Sidebar>
	)
}
