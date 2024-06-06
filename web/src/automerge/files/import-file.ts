import type {Repo} from "@automerge/automerge-repo"
import contentTypeRegistry from "../content/content-type-registry.ts"
import type {AutomergeValue} from "@automerge/automerge/next"

// todo combine with createFile
// todo this should probably be sync and take a Uint8Array instead of a file
export default async function importFile(
	repo: Repo,
	fileTemplate: Partial<Omit<lb.File, "id" | "type" | "content">> & {
		ext: string
	},
	computerFile: File,
) {
	const creator = contentTypeRegistry.getCreator(fileTemplate.ext)
	if (!creator) {
		throw new Error(
			`cannot create a .${fileTemplate.ext} file, register a creator first.`,
		)
	}
	const contentHandle = await creator.import(repo, computerFile)

	const fileHandle = repo.create<lb.File>({
		id: "" as lb.FileId,
		type: "file",
		name: fileTemplate.name || "",
		ext: fileTemplate.ext,
		content: contentHandle.documentId as lb.ContentId,
		annotation: "",
	})
	fileHandle.change(file => {
		// @ts-expect-error this is read-only, but we need to write it here
		file.id = fileHandle.documentId as lb.FileId
	})

	return fileHandle
}
