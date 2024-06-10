import type {Repo} from "@automerge/automerge-repo"
import createSpacesAPI from "../spaces/spaces-api.ts"
import createDocumentsAPI from "../documents/documents-api.ts"
import createFilesAPI from "../files/files-api.ts"
import createProjectsAPI from "../projects/projects-api.ts"
import {
	coderRegistry,
	previewRegistry,
	typeRegistry,
	contentViewRegistry,
	metadataViewRegistry,
} from "../contents/types/content-type-registry.ts"
import createContentsAPI from "../contents/contents-api.ts"

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
