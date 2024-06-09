import {useEffect, useState} from "preact/hooks"
import {useLittlebookAPI} from "../littlebook-api/use-littlebook.ts"

export function useProject(id: lb.ProjectId) {
	const lb = useLittlebookAPI()
	const project = lb.projects.get(id)
	const [, setGen] = useState(0)
	const rerender = () => setGen(v => v + 1)

	// biome-ignore lint/correctness/useExhaustiveDependencies: it's ok
	useEffect(() => {
		rerender()
		return () => project.destroy()
	}, [project.doc, project])
	return project
}
