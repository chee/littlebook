import {useParams} from "wouter-preact"
import {useLittlebookAPI} from "../../api/use-littlebook-api.ts"
import {typeRegistry, type ContentView} from "../types/content-type-registry.ts"
import {useCallback} from "preact/hooks"

const InfoPanel: ContentView<any> = ({file, content}) => {
	if (!file.ready) return <div />
	const lb = useLittlebookAPI()
	const {projectId} = useParams()

	const switchContent = useCallback((event: Event) => {
		if (event.target instanceof HTMLSelectElement) {
			const to = event.target.value as lb.UniformTypeIdentifier
			const converted = lb.contents.recode(content, to)
			file.change(file => {
				file.content = converted.id
			})
		}
	}, [])

	const deleteFile = useCallback(() => {
		if (!file.id) {
			return
		}
		lb.files.deleteFile(file.id, projectId as lb.ProjectId)
	}, [])
	return (
		<flex-box column>
			<label>
				name
				<input readonly value={file.name} />
			</label>
			<label>
				id
				<input readonly value={file.id} />
			</label>
			{JSON.stringify(typeRegistry.forFilename(file.doc.name))}
			<select onChange={switchContent}>
				{typeRegistry.forFilename(file.doc.name).map(type => {
					return (
						<option key={type} value={type}>
							{type}
						</option>
					)
				})}
			</select>
			<button type="button" onClick={deleteFile}>
				destroy file
			</button>
		</flex-box>
	)
}

export default InfoPanel

declare module "preact" {
	namespace JSX {
		interface IntrinsicElements {
			"flex-box": JSX.HTMLAttributes<HTMLElement> & {
				column?: boolean
				justify?: boolean
				align?: boolean
			}
		}
	}
}
