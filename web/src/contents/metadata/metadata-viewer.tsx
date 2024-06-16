import useFile from "../../ui/automerge/use-file.ts"
import {metadataViewRegistry} from "../types/type-registries.ts"
import useContent from "../use-content.ts"

export default function MetadataViewer() {
	// const [file, changeFile] = useFile(fileId)
	// if (!file) {
	return <div class="metadata metadata--loading metadata--loading-file" />
	// }
	const [content, changeContent] = useContent(file.content)
	if (!content) {
		return <div class="metadata metadata--loading metadata--loading-content" />
	}

	const [MetadataView] = metadataViewRegistry.get(content.contentType)

	if (!MetadataView) {
		return null
	}

	return (
		<MetadataView
			content={content}
			file={file}
			changeContent={changeContent}
			changeFile={changeFile}
		/>
	)
}
