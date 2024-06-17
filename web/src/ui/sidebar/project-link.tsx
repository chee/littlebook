import {Show} from "solid-js"
import useDocument from "../automerge/use-document.ts"
import {CardLink} from "../elements/card/card.tsx"
// import * as urlFor from "../urls.ts"
// import {useDocument} from "@automerge/automerge-repo-react-hooks"
import EditableName from "../littlebook/documents/editable-name.tsx"
// import {useSpaceState} from "../littlebook/spaces/space-state.tsx"
type id = lb.ProjectId

export default function ProjectLink({
	projectId,
}: {
	projectId: id
}) {
	const [project, changeProject] = useDocument<lb.Project>(projectId)

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
