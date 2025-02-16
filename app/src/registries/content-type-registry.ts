import {isValidAutomergeUrl, type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry} from "./registry.ts"
import {
	type AutomergeURL,
	CodeShape,
	type ContentType,
	MarkdownShape,
	TextShape,
} from "@pointplace/types"
import {z} from "zod"

export class ContentTypeRegistry extends Registry<
	"content-type",
	ContentType<unknown>
> {
	constructor({repo}: {repo: Repo}) {
		super({
			repo,
			typename: "content-type",
		})
		for (const type of KnownContentTypes) {
			this.register(type)
		}
	}

	*typesConformingTo(conformsTo: string): Generator<ContentType<unknown>> {
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
}

export const FolderShape = z.object({
	files: z.custom<AutomergeURL>(url => isValidAutomergeUrl(url)).array(),
})

export type FolderShape = z.infer<typeof FolderShape>

export const folder = {
	id: "public.folder",
	displayName: "folder",
	schema: FolderShape,
} satisfies ContentType<FolderShape>

export const text = {
	id: "public.text",
	displayName: "plain text",
	schema: TextShape,
} satisfies ContentType<TextShape>

export const code = {
	id: "public.code",
	displayName: "computer code",
	conformsTo: ["public.text"],
	schema: CodeShape,
} satisfies ContentType<CodeShape>

export const markdown = {
	id: "public.markdown",
	displayName: "markdown",
	conformsTo: ["public.text", "public.code"],
	schema: MarkdownShape,
} satisfies ContentType<MarkdownShape>

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
