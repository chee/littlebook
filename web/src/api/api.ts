import type {Repo} from "@automerge/automerge-repo"
import {
	coderRegistry,
	editorViewRegistry,
	// metadataViewRegistry,
	previewRegistry,
	typeRegistry,
} from "../contents/types/type-registries.ts"
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
		coders: coderRegistry,
		contentTypes: typeRegistry,
		views: {
			preview: previewRegistry,
			editor: editorViewRegistry,
			// metadata: metadataViewRegistry,
		},
		contents: createContentsAPI(repo),
	}
}
