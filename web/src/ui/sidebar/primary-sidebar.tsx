import {Card, CardLink} from "../elements/card/card.tsx"
import useDocument from "../automerge/use-document.ts"
import {useLocalState} from "../automerge/auth/use-local-state.ts"
import ProjectLink from "./project-link.tsx"
import {useLittlebookAPI} from "../api/use-api.ts"
// import {useSpaceState} from "../littlebook/spaces/space-state.tsx"
import Sidebar from "../elements/sidebar/sidebar.tsx"
import {For, createEffect, createMemo} from "solid-js"

// todo this should be Navbar or something, and Sidebar should be the generic
// container so that the other side can have one too
export default function PrimarySidebar() {
	// const ui = useSpaceState()
	// const {shareId} = ui.space

	// const sidebar = ui.layout.sidebars.primary

	const lb = useLittlebookAPI()

	const [localState] = useLocalState()

	const [space, changeSpace] = useDocument<lb.Space>(localState.spaceId!)
	createEffect(() => {
		console.log(space()?.projects, "ppp")
	})
	const projects = createMemo(() => space()?.projects)

	const state = {open: true}

	return (
		<Sidebar state={state} class="pr-6">
			<Card>
				<CardLink
					icon="📥"
					title="inbox"
					// href={getRoute({shareId: shareId.value, page: "inbox"})}
					href="inbox"
				/>
			</Card>
			<Card>
				<CardLink
					icon="⭐"
					title="today"
					// href={getRoute({shareId: shareId.value, page: "today"})}
					href="today"
				/>
				<CardLink
					icon="📆"
					title="upcoming"
					// href={getRoute({shareId: shareId.value, page: "upcoming"})}
					href="upcoming"
				/>
				<CardLink
					icon="🗃️"
					title="someday"
					// href={getRoute({shareId: shareId.value, page: "someday"})}
					href="someday"
				/>
			</Card>
			<Card
				title="projects"
				headerAction={{
					label: "create project",
					icon: "+",
					action() {
						const projectHandle = lb()?.projects.createHandle()
						console.log(projectHandle)
						projectHandle?.doc().then(prj => {
							if (prj) {
								const change = lb()?.spaces.addProject(prj.id)
								console.log(change)
								change && changeSpace(change)
								setTimeout(() => {
									// route({
									// 	shareId: ui.space.shareId.value,
									// 	project: prj,
									// })
									// ui.projects.renaming.value = prj.id
								})
							}
						})
					},
				}}>
				<For each={projects()} fallback={<div>lol</div>}>
					{id => {
						console.log(id)
						return <ProjectLink projectId={id} />
					}}
				</For>
			</Card>
			{/* {space?.areas.map(id => {
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
			{/* </Card> */}
			{/* ) */}
			{/* })} */}
		</Sidebar>
	)
}
