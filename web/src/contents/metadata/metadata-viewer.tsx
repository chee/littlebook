import useFile from "../../files/use-file.ts"
import {metadataViewRegistry} from "../types/content-type-registry.ts"
import useContent from "../use-content.ts"

export default function MetadataViewer({fileId}: {fileId: lb.FileId}) {
	const [file, changeFile] = useFile(fileId)
	if (!file) {
		return <div class="metadata metadata--loading metadata--loading-file" />
	}
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