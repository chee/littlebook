import type {Repo} from "@automerge/automerge-repo"
import createContentsAPI from "./contents.ts"
import createDocumentsAPI from "./documents.ts"
import createFilesAPI from "./files.ts"
import createProjectsAPI from "./projects.ts"
import createSpacesAPI from "./spaces.ts"

/*
 * const doc = littlebook.documents.create("hehe")
 * const project = littlebook.projects.create()
 */
export default function createLittlebookAPI(repo: Repo) {
	return {
		documents: createDocumentsAPI(repo),
		spaces: createSpacesAPI(repo),
		files: createFilesAPI(repo),
		projects: createProjectsAPI(repo),
		contents: createContentsAPI(repo),
	}
}
