import createLittlebookAPI from "../../api/api.ts"
import {useAutomerge} from "../automerge/use-automerge.ts"
export function useLittlebookAPI() {
	const automerge = useAutomerge()
	return createLittlebookAPI(automerge.repo)
}
