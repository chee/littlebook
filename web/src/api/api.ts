import type {Repo} from "@automerge/automerge-repo"
import createContentsAPI from "./contents.ts"
import createDocumentsAPI from "./documents.ts"
import createFoldersAPI from "./folders.ts"
import createFilesAPI from "./files.ts"
import createSpacesAPI from "./spaces.ts"

export default function createLittlebookAPI(repo: Repo) {
	return {
		documents: createDocumentsAPI(repo),
		spaces: createSpacesAPI(repo),
		folders: createFoldersAPI(repo),
		files: createFilesAPI(repo),
		contents: createContentsAPI(repo),
	}
}
