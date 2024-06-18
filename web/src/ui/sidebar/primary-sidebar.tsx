import {Card, CardLink} from "../elements/card/card.tsx"
import useDocument from "../automerge/use-document.ts"
import {useLocalAuthState} from "../automerge/auth/local.ts"
import ProjectLink from "./project-link.tsx"
import {useLittlebookAPI} from "../api/use-api.ts"
// import {useSpaceState} from "../littlebook/spaces/space-state.tsx"
import Sidebar from "../elements/sidebar/sidebar.tsx"
import {For, createEffect, createMemo, createResource} from "solid-js"
// import {useAuth} from "../automerge/auth/use-automerge.ts"
import getDocIdFromTeam from "../../auth/teams/get-doc-id-from-team.ts"
import {getSpaceHandle} from "../../api/spaces.ts"
import type {Doc} from "@automerge/automerge/next"
import {useAutomerge} from "../automerge/auth/use-automerge.ts"

// todo this should be Navbar or something, and Sidebar should be the generic
// container so that the other side can have one too
export default function PrimarySidebar() {
	const automerge = useAutomerge()
	const spaceId = createMemo(
		() => automerge()?.team && getDocIdFromTeam(automerge()?.team!),
	)
	const [space, changeSpace] = useDocument<lb.Space>(spaceId)

	const lb = useLittlebookAPI()
	const [spaceDoc, what] = createResource<Doc<lb.Space> | undefined>(
		async () =>
			automerge()?.repo && getSpaceHandle(automerge()?.repo!, spaceId()!).doc(),
	)

	const state = {open: true}

	return (
		<Sidebar state={state}>
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
						projectHandle?.doc().then(prj => {
							if (prj) {
								const change = lb()?.spaces.addProject(prj.id)
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
				<For each={spaceDoc()?.projects} fallback={<div>lol</div>}>
					{id => {
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
