import type {Repo} from "@automerge/automerge-repo"
import createSpacesAPI from "./spaces.ts"
import createDocumentsAPI from "./documents.ts"
import createFilesAPI from "./files.ts"
import createProjectsAPI from "./projects.ts"
import {
	coderRegistry,
	previewRegistry,
	typeRegistry,
	contentViewRegistry,
	metadataViewRegistry,
} from "../contents/types/type-registries.ts"
import createContentsAPI from "./contents.ts"

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
			content: contentViewRegistry,
			metadata: metadataViewRegistry,
		},
		contents: createContentsAPI(repo),
	}
}