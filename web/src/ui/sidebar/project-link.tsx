import {CardLink} from "../card/card.tsx"
import * as urlFor from "../urls.ts"
import {useDocument} from "@automerge/automerge-repo-react-hooks"
import EditableName from "../documents/editable-name.tsx"
import {useSpaceUIState} from "../space-ui-state.tsx"

type id = lb.ProjectId

export default function ({
	projectId,
}: {
	projectId: id
}) {
	const ui = useSpaceUIState()
	if (!ui.projects.selected) return null
	const [project, changeProject] = useDocument<lb.Project>(projectId)
	if (!project) return null

	const href = urlFor.project(project)
	const current = ui.projects.selected.value == projectId
	return (
		<CardLink
			title=""
			href={href}
			icon={project.icon}
			current={current}
			onClick={event => {
				if (current) {
					event.preventDefault()
				}
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
