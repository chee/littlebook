import {useDocument} from "@automerge/automerge-repo-react-hooks"

export default function useContent<T extends lb.AnyContent>(id: lb.ContentId) {
	return useDocument<lb.Content<T>>(id)
}
