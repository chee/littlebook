import {change, type AutomergeValue} from "@automerge/automerge/next"
import contentTypeRegistry from "../../automerge/content/content-type-registry.ts"
import {useDocument} from "@automerge/automerge-repo-react-hooks"

export default function ContentPane({fileId}: {fileId: lb.FileId}) {
	const [file, changeFile] = useDocument<lb.File>(fileId)
	if (!file) {
		return <div class="content-pane--loading content-pane--file-loading" />
	}
	const View = contentTypeRegistry.getView(file.ext)
	if (!View) {
		return <div>${file.name}</div>
	}
	const [content, changeContent] = useDocument<lb.Content<AutomergeValue>>(
		file.content,
	)
	if (!content) {
		return <div class="content-pane--loading content-pane--content-loading" />
	}
	return <View content={content} changeContent={changeContent} />
}
