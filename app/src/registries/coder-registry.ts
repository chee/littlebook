import {type AutomergeUrl, type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry} from "./registry.ts"
import {
	StoredCoder,
	TextShape,
	CodeShape,
	MarkdownShape,
	type Coder,
} from "@pointplace/types"
import type {FolderShape} from "./content-type-registry.ts"

export class CoderRegistry extends Registry<StoredCoder, Coder> {
	constructor({repo}: {repo: Repo}) {
		super({
			repo,
			storedSchema: StoredCoder,
			type: "coder",
		})

		for (const coder of defaultCoders) {
			this.register(coder as Coder<unknown>)
		}
	}

	// this yields in three steps to allow for more specific matches to be yielded first
	*forContentType(contentType: string) {
		for (const coder of Object.values(this.records)) {
			if (coder.contentType === contentType) {
				yield coder
			}
		}
	}

	*forMIMEType(mimeType: string) {
		for (const coder of Object.values(this.records)) {
			if (coder.mimeTypes && coder.mimeTypes.includes(mimeType)) {
				yield coder
			}
		}
	}

	*forFilename(_filename: string) {
		for (const coder of Object.values(this.records)) {
			if (
				false as boolean
				// coder.filePatterns &&
				// coder.filePatterns.some(
				// coderFilePattern =>
				// micromatch([filename], coderFilePattern).length
				// )
			) {
				yield coder
			}
		}
	}
}

const folder: Coder<FolderShape> = {
	id: "folder",
	displayName: "folder",
	contentType: "public.folder",
	fromBytes() {
		return {
			ok: false,
			err: new Error("we don't think about folders as bytes"),
		}
	},
	toBytes() {
		return {
			ok: false,
			err: new Error("we don't think about folders as bytes"),
		}
	},
	new() {
		return {
			files: [] as AutomergeUrl[],
		}
	},
}

const text: Coder<TextShape> = {
	id: "text",
	displayName: "plain text",
	contentType: "public.text",
	fromBytes(bytes: Uint8Array) {
		try {
			return {ok: true, val: {text: new TextDecoder().decode(bytes)}}
		} catch (error) {
			return {ok: false, err: error as Error}
		}
	},
	toBytes(content: {text: string}) {
		try {
			return {ok: true, val: new TextEncoder().encode(content.text)}
		} catch (error) {
			return {ok: false, err: error as Error}
		}
	},
	// todo maybe fromFile and new should return [file, entry]
	async fromFile(file) {
		const bytes = new Uint8Array(await file.arrayBuffer())
		return this.fromBytes(bytes)
	},
	new() {
		return {text: ""}
	},
}

const code: Coder<CodeShape> = {
	id: "code",
	displayName: "computer code",
	contentType: "public.code",
	fromBytes(bytes: Uint8Array) {
		return text.fromBytes(bytes)
	},
	toBytes(value: {text: string}) {
		return text.toBytes(value)
	},
	async fromFile(file) {
		const bytes = new Uint8Array(await file.arrayBuffer())
		// this await is on purpose
		const content = await this.fromBytes(bytes)

		if (!content.ok) {
			return content
		}

		return {
			ok: true,
			val: {
				text: content.val.text,
				language: file.type.slice(file.type.indexOf("/") + 1),
			},
		}
	},
	new() {
		return {
			text: `function hello() {\n\treturn "world"\n}`,
			language: "javascript",
		}
	},
}

const markdown: Coder<MarkdownShape> = {
	id: "markdown",
	displayName: "markdown",
	contentType: "public.markdown",
	filePatterns: ["*.md", "*.markdown"],
	mimeTypes: ["text/markdown"],
	fromBytes(bytes: Uint8Array) {
		try {
			return {
				ok: true,
				val: {
					text: new TextDecoder().decode(bytes),
					language: "markdown",
				},
			}
		} catch (error) {
			return {ok: false, err: error as Error}
		}
	},
	toBytes(value: {text: string}) {
		return text.toBytes(value)
	},
	async fromFile(file) {
		const bytes = new Uint8Array(await file.arrayBuffer())
		const content = await this.fromBytes(bytes)

		if (!content.ok) {
			return content
		}

		return {
			ok: true,
			val: {
				text: content.val.text,
				language: "markdown",
			},
		}
	},
	new() {
		return {text: "", language: "markdown"}
	},
}

const defaultCoders = [text, code, markdown, folder]

export const CoderRegistryContext = createContext<CoderRegistry>()

export function useCoderRegistry() {
	const value = useContext(CoderRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a CoderRegistryContext")
	}
	return value
}
