import {useDocument} from "@automerge/automerge-repo-react-hooks"

export default function useFile(id?: lb.FileId) {
	return useDocument<lb.File>(id)
}
