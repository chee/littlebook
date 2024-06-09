import {useContext} from "preact/hooks"
import {LittlebookAPIContext} from "../components/api-provider.tsx"

export function useLittlebookAPI() {
	const lb = useContext(LittlebookAPIContext)
	if (!lb) throw new Error("you gotta wrap me in a LittlebookProvider")
	return lb
}

export function useProject(id: lb.ProjectId) {
	const lb = useLittlebookAPI()
	return lb.projects.get(id)
}
