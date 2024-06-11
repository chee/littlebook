import {useRoute} from "wouter-preact"
import {CardLink} from "../card/card.tsx"
import {useState} from "preact/hooks"
import * as urlFor from "../urls.ts"
import {useDocument} from "@automerge/automerge-repo-react-hooks"
import {navigate} from "wouter-preact/use-browser-location"
import EditableName from "../documents/editable-name.tsx"

type id = lb.ProjectId

export default function ({
	id,
	editingId,
	setEditingId,
}: {
	id: id
	editingId?: id
	setEditingId(id?: id): void
}) {
	const [project, changeProject] = useDocument<lb.Project>(id)
	if (!project) return <div />
	const href = urlFor.project(project)
	const [current] = useRoute(urlFor.route.project(project))
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
				id={id}
				setEditingId={setEditingId}
				selectedId={current ? id : undefined}
				editingId={editingId}
				name={project.name}
				saveName={name => {
					console.log("saving")
					changeProject(project => {
						project.name = name
					})
					setEditingId()
				}}
			/>
		</CardLink>
	)
}
