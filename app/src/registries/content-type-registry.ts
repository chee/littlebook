import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {err, ok, type Result} from "true-myth/result"
import {Registry} from "./registry.ts"
import {
	CodeContentType,
	CodeShape,
	ContentType,
	MarkdownContentType,
	MarkdownShape,
	StoredContentType,
	TextContentType,
	TextShape,
} from "@pointplace/schemas"
import * as v from "valibot"

export class ContentTypeRegistry extends Registry<
	StoredContentType,
	ContentType
> {
	constructor({repo}: {repo: Repo}) {
		super({
			repo,
			storedSchema: StoredContentType,
			schema: ContentType,
			name: "content-type",
		})
		for (const type of KnownContentTypes) {
			this.register(type)
		}
	}

	// todo recursively look up conformance
	*typesConformingTo(conformsTo: string): Generator<ContentType> {
		for (const type of Object.values(this.records)) {
			if (type.conformsTo?.includes(conformsTo)) {
				yield type
			} else {
				for (const conformingType of type.conformsTo || []) {
					yield* this.typesConformingTo(conformingType)
				}
			}
		}
	}

	get(id: string): Result<ContentType, Error> {
		const type = this.records[id]
		return type ? ok(type) : err(new Error(`content type not found: ${id}`))
	}
}

export const text = v.parse(TextContentType, {
	id: "public.text",
	displayName: "plain text",
	schema: TextShape,
})

export const code = v.parse(CodeContentType, {
	id: "public.code",
	displayName: "computer code",
	conformsTo: ["public.text"],
	schema: CodeShape,
})

export const markdown = v.parse(MarkdownContentType, {
	id: "public.markdown",
	displayName: "markdown",
	conformsTo: ["public.text", "public.code"],
	schema: MarkdownShape,
})

export const KnownContentTypes = [text, code, markdown]

export const ContentTypeRegistryContext = createContext<ContentTypeRegistry>()

export function useContentTypeRegistry() {
	const value = useContext(ContentTypeRegistryContext)
	if (!value) {
		throw new Error(
			"this needs to be used within a ContentTypeRegistryContext"
		)
	}
	return value
}
