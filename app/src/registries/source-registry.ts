import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry} from "./registry.ts"
import {
	TextShape,
	CodeShape,
	MarkdownShape,
	type Source,
	type FilesystemSource,
	type VoidSource,
	type AutomergeURL,
} from "@pointplace/types"
import * as v from "valibot"

// todo a unified registry
export class SourceRegistry extends Registry<"source", Source> {
	constructor({repo}: {repo: Repo}) {
		super({
			repo,
			typename: "source",
		})

		for (const coder of knownSources) {
			this.register(coder as Source<unknown>)
		}
	}
}

export const FolderShape = v.object({
	files: v.array(v.string()),
})

export type FolderShape = v.InferOutput<typeof FolderShape>

// todo move all of these to the base plugin
const newFolder: VoidSource<FolderShape> = {
	id: "new-folder",
	category: "new",
	displayName: "folder",
	new() {
		return [
			{
				files: [] as AutomergeURL[],
			},
			{name: "new folder"},
		]
	},
}

const newText: VoidSource<TextShape> = {
	id: "new-text",
	category: "new",
	displayName: "plain text",
	new() {
		return [{text: ""}]
	},
}

const importText: FilesystemSource<TextShape> = {
	id: "new-text",
	category: "filesystem",
	displayName: "plain text",
	patterns: ["*.txt", "*.text"],
	mimes: ["text/plain", "text/*"],
	async import(file) {
		const text = await file.text()
		console.log(file.type)
		return [
			{
				text,
			},
			{name: file.name},
		]
	},
}

const newCode: VoidSource<CodeShape> = {
	id: "new-code",
	category: "new",
	displayName: "computer code",
	new() {
		return [{text: "", language: ""}]
	},
}

const newMarkdown: VoidSource<MarkdownShape> = {
	id: "new-markdown",
	category: "new",
	displayName: "markdown",
	new() {
		return [{text: "", language: "markdown"}]
	},
}

const importMarkdown: FilesystemSource<MarkdownShape> = {
	id: "import-markdown",
	category: "filesystem",
	displayName: "markdown",
	mimes: ["text/markdown", "text/x-markdown"],
	patterns: ["*.md", "*.markdown", "*.mdown", "*.markdn"],
	async import(file) {
		const text = await file.text()
		return [
			{
				text,
				language: "markdown",
			},
			{name: file.name},
		]
	},
}

const knownSources = [
	newCode,
	newText,
	newFolder,
	newMarkdown,
	importText,
	importMarkdown,
]

export const SourceRegistryContext = createContext<SourceRegistry>()

export function useSourceRegistry() {
	const value = useContext(SourceRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a SourceRegistryContext")
	}
	return value
}
