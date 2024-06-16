import {CardLink} from "../elements/card/card.tsx"
import * as urlFor from "../urls.ts"
import {useDocument} from "@automerge/automerge-repo-react-hooks"
import EditableName from "../documents/editable-name.tsx"
import {useSpaceState} from "../space/space-state.tsx"
type id = lb.ProjectId

export default function ProjectLink({
	projectId,
}: {
	projectId: id
}) {
	const ui = useSpaceState()
	const [project, changeProject] = useDocument<lb.Project>(projectId)
	if (!project) return null

	const current = ui.projects.selected.value == projectId

	return (
		<CardLink
			class="bold"
			title=""
			href={"/"}
			icon={project.icon}
			current={current}
			onDblClick={event => {
				ui.projects.renaming.value = projectId
			}}>
			<EditableName
				id={projectId}
				name={project.name}
				saveName={name => {
					changeProject(project => {
						project.name = name
					})
				}}
				which="projects"
			/>
		</CardLink>
	)
}
