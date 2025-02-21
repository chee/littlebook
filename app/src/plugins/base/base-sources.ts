import type {
	AutomergeURL,
	CodeShape,
	FilesystemSource,
	FolderShape,
	MarkdownShape,
	PluginAPI,
	TextShape,
	VoidSource,
} from "@pointplace/types"

const newFolder: VoidSource<FolderShape> = {
	id: "new-folder",
	category: "new",
	displayName: "folder",
	new: () => [{files: [] as AutomergeURL[]}, {name: "new folder"}],
}

const newText: VoidSource<TextShape> = {
	id: "new-text",
	category: "new",
	displayName: "plain text",
	new: () => [{text: ""}],
}

const importText: FilesystemSource<TextShape> = {
	id: "new-text",
	category: "filesystem",
	displayName: "plain text",
	patterns: ["*.txt", "*.text"],
	mimes: ["text/plain", "text/*"],
	async import(file) {
		const text = await file.text()
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
	new: () => [{text: "", language: ""}],
}

const newMarkdown: VoidSource<MarkdownShape> = {
	id: "new-markdown",
	category: "new",
	displayName: "markdown",
	new: () => [{text: "", language: "markdown"}],
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

export default function registerBaseSources(api: PluginAPI) {
	api.registerSource(newFolder)
	api.registerSource(newText)
	api.registerSource(importText)
	api.registerSource(newCode)
	api.registerSource(newMarkdown)
	api.registerSource(importMarkdown)
}
