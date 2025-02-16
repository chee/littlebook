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
import type {FolderShape} from "./content-type-registry.ts"

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

// todo move all of these to the base plugin
const newFolder: VoidSource<FolderShape> = {
	id: "new-folder",
	category: "new",
	displayName: "folder",
	contentType: "public.folder",
	create(help) {
		return {
			[help.nameKey]: "new folder",
			files: [] as AutomergeURL[],
		}
	},
}

const newText: VoidSource<TextShape> = {
	id: "new-text",
	category: "new",
	displayName: "plain text",
	contentType: "public.text",
	create() {
		return {text: ""}
	},
}

const importText: FilesystemSource<TextShape> = {
	id: "new-text",
	category: "filesystem",
	displayName: "plain text",
	contentType: "public.text",
	async import(file, help) {
		const text = await file.text()
		return {
			[help.nameKey]: file.name,
			text,
		}
	},
}

const newCode: VoidSource<CodeShape> = {
	id: "new-code",
	category: "new",
	displayName: "computer code",
	contentType: "public.code",
	create() {
		return {text: "", language: ""}
	},
}

const importCode: FilesystemSource<CodeShape> = {
	id: "import-code",
	category: "filesystem",
	displayName: "computer code",
	contentType: "public.code",
	async import(file, help) {
		const text = await file.text()
		return {
			[help.nameKey]: file.name,
			text,
			language: file?.type?.slice(file.type?.indexOf("/") + 1) || "",
		}
	},
}

const newMarkdown: VoidSource<MarkdownShape> = {
	id: "new-markdown",
	category: "new",
	displayName: "markdown",
	contentType: "public.markdown",
	create() {
		return {text: "", language: "markdown"}
	},
}

const importMarkdown: FilesystemSource<MarkdownShape> = {
	id: "import-markdown",
	category: "filesystem",
	displayName: "markdown",
	contentType: "public.markdown",
	async import(file, help) {
		const text = await file.text()
		return {
			[help.nameKey]: file.name,
			text,
			language: "markdown",
		}
	},
}

const knownSources = [
	newCode,
	newText,
	newFolder,
	newMarkdown,
	importCode,
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
