import {useRoute} from "wouter-preact"
import {CardLink} from "../card/card.tsx"
import {useState} from "preact/hooks"
import * as urlFor from "../urls.ts"
import {useDocument} from "@automerge/automerge-repo-react-hooks"
import {navigate} from "wouter-preact/use-browser-location"

export default function ({id}: {id: lb.ProjectId}) {
	// todo move this responsibility up a level
	// todo this should actually maybe be a global context
	// because the IDs are unique it could be a editingItem={id|null}
	const [editing, setEditing] = useState(false)
	const [project, changeProject] = useDocument<lb.Project>(id)
	if (!project) return <div />
	const href = urlFor.project(project)
	const [current] = useRoute(urlFor.route.project(project))
	const [name, setName] = useState(project.name.toString())

	if (editing) {
		return (
			<form
				class="card-link"
				onSubmit={() => {
					changeProject(project => {
						project.name = name
						navigate(urlFor.project(project))
					})
					setEditing(false)
				}}>
				<span class="card-link-inner">
					<span class="card-link-title card-link-title--editing">
						<span class="card-link-title__icon">{project.icon}</span>
						<input
							class="card-link-title__text"
							value={name}
							autofocus
							ref={input => input?.focus()}
							onInput={event => {
								if (!(event.target instanceof HTMLInputElement)) return
								setName(event.target.value)
							}}
							onKeyDown={event => {
								// todo react hotkeys
								if (event.key === "Escape") {
									setEditing(false)
								}
							}}
						/>
					</span>
				</span>
			</form>
		)
	}

	return (
		<CardLink
			href={href}
			icon={project.icon}
			title={project.name.toString()}
			current={current}
			onClick={event => {
				if (current) {
					event.preventDefault()
					setEditing(true)
				}
			}}
		/>
	)
}