import type PluginAPI from "../../../../plugin-api/plugin-api.ts"
import type {
	CodeShape,
	FolderShape,
	MarkdownShape,
	TextShape,
} from "../../../../plugin-api/shapes/shapes.ts"
import type {
	CreateSource,
	FilesystemSource,
} from "@littlebook/plugin-api/types/source.ts"
import type {FileEntryURL} from ":/docs/file-entry-doc.ts"

const newFolder: CreateSource<FolderShape> = {
	id: "new-folder",
	category: "new",
	displayName: "Folder",
	new() {
		return {
			name: "new folder",
			content: {files: [] as FileEntryURL[]},
		}
	},
}

const newText: CreateSource<TextShape> = {
	id: "new-text",
	category: "new",
	displayName: "plain text",
	new() {
		return {content: {text: ""}}
	},
}

const importText: FilesystemSource<TextShape> = {
	id: "new-text",
	category: "filesystem",
	displayName: "Plain Text",
	patterns: ["*.txt", "*.text"],
	mimes: ["text/plain", "text/*"],
	async import(file) {
		const text = await file.text()
		return {
			name: file.name,
			content: {text},
		}
	},
}

const newCode: CreateSource<CodeShape> = {
	id: "new-code",
	category: "new",
	displayName: "Computer Code",
	new() {
		return {content: {text: "", language: ""}}
	},
}

const newMarkdown: CreateSource<MarkdownShape> = {
	id: "new-markdown",
	category: "new",
	displayName: "Markdown",
	new() {
		return {
			name: "new markdown",
			content: {text: "", language: "markdown"},
		}
	},
}

const importMarkdown: FilesystemSource<MarkdownShape> = {
	id: "import-markdown",
	category: "filesystem",
	displayName: "Markdown",
	mimes: ["text/markdown", "text/x-markdown"],
	patterns: ["*.md", "*.markdown", "*.mdown", "*.markdn"],
	async import(file) {
		const text = await file.text()
		return {
			name: file.name,
			content: {
				text,
				language: "markdown",
			},
		}
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
