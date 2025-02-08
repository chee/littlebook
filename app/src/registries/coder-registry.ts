import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry} from "./registry.ts"
import {
	StoredCoder,
	Coder,
	inferCoder,
	TextShape,
	CodeShape,
	MarkdownShape,
} from "@pointplace/schemas"
import * as v from "valibot"

export class CoderRegistry extends Registry<StoredCoder, Coder> {
	constructor({repo}: {repo: Repo}) {
		super({
			repo,
			schema: Coder,
			storedSchema: StoredCoder,
			name: "coder",
		})
		for (const coder of defaultCoders) {
			this.register(coder)
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

// todo i forgot about async coders again
const text = v.parse(inferCoder(TextShape), {
	id: "text",
	displayName: "plain text",
	contentType: "public.text",
	mimeTypes: ["text/plain"],
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
	async fromFile(file) {
		const bytes = new Uint8Array(await file.arrayBuffer())
		return this.fromBytes(bytes)
	},
	new() {
		return {text: ""}
	},
} satisfies Coder<typeof TextShape>)

const code = v.parse(inferCoder(CodeShape), {
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
		const content = this.fromBytes(bytes)

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
		return {text: "# my file", language: "javascript"}
	},
} satisfies Coder<typeof CodeShape>)

const markdown = v.parse(inferCoder(MarkdownShape), {
	id: "markdown",
	displayName: "markdown",
	contentType: "public.markdown",
	filePatterns: ["*.md", "*.markdown"],
	mimeTypes: ["text/markdown"],
	fromBytes(bytes: Uint8Array) {
		return text.fromBytes(bytes)
	},
	toBytes(value: {text: string}) {
		return text.toBytes(value)
	},
	async fromFile(file) {
		const bytes = new Uint8Array(await file.arrayBuffer())
		const content = this.fromBytes(bytes)

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
} satisfies Coder<typeof CodeShape>)

const defaultCoders = [text, code, markdown]

export const CoderRegistryContext = createContext<CoderRegistry>()

export function useCoderRegistry() {
	const value = useContext(CoderRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a CoderRegistryContext")
	}
	return value
}
