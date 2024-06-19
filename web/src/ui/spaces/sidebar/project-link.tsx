import {Show, createMemo} from "solid-js"
// import * as urlFor from "../urls.ts"
// import {useDocument} from "@automerge/automerge-repo-react-hooks"
import EditableName from "../../documents/editable-name.tsx"
import useDocument from "../../documents/use-document.ts"
import {CardLink} from "../../elements/card/card.tsx"
// import {useSpaceState} from "../littlebook/spaces/space-state.tsx"
type id = lb.ProjectId

export default function ProjectLink({
	projectId,
}: {
	projectId: id
}) {
	const pid = createMemo(() => projectId)
	const [project, changeProject] = useDocument<lb.Project>(pid)

	return (
		<Show when={project()}>
			<CardLink
				class="bold"
				title=""
				href={`projects/${projectId}`}
				icon={project()!.icon}
				// current={current}
				onDblClick={event => {
					// ui.projects.renaming.value = projectId
				}}>
				<EditableName
					id={projectId}
					name={project()!.name}
					saveName={name => {
						changeProject(project => {
							project.name = name
						})
					}}
					which="projects"
				/>
			</CardLink>
		</Show>
	)
}
