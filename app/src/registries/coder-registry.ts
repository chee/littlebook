import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import z from "zod"
import micromatch from "micromatch"
import {Registry} from "./registry.ts"

export class CoderRegistry extends Registry<StoredCoder, Coder> {
	constructor({repo}: {repo: Repo}) {
		super({
			repo,
			schema: Coder,
			storedSchema: StoredCoder,
		})
		for (const coder of defaultCoders) {
			this.register(coder)
		}
	}

	// this yields in three steps to allow for more specific matches to be yielded first
	*codersForContentType(contentType: string) {
		for (const coder of Object.values(this.records)) {
			if (coder.contentType === contentType) {
				yield coder
			}
		}
	}

	*codersForMimeType(mimeType: string) {
		for (const coder of Object.values(this.records)) {
			if (coder.mimeTypes && coder.mimeTypes.includes(mimeType)) {
				yield coder
			}
		}
	}

	*codersForFilename(filename: string) {
		for (const coder of Object.values(this.records)) {
			if (
				coder.filePatterns &&
				coder.filePatterns.some(
					coderFilePattern =>
						micromatch([filename], coderFilePattern).length
				)
			) {
				yield coder
			}
		}
	}
}

export const CoderMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	contentType: z.string(),
	plugin: z.string().optional(),
	mimeTypes: z.array(z.string()).optional(),
	filePatterns: z.array(z.string()).optional(),
})

export type CoderMetadata = z.infer<typeof CoderMetadata>

export function inferCoder<T extends z.ZodTypeAny>(schema: T) {
	return z
		.object({
			decode: z.function().args(z.instanceof(Uint8Array)).returns(schema),
			encode: z.function().args(schema).returns(z.instanceof(Uint8Array)),
			new: z.function().args().returns(schema),
		})
		.extend(CoderMetadata.shape)
}

export const Coder: z.ZodType<Coder> = inferCoder(z.unknown())

export type Coder<T extends z.ZodTypeAny = z.ZodTypeAny> = z.infer<
	ReturnType<typeof inferCoder<T>>
>

// how a compiled coder plugin is stored in automerge
export const StoredCoder = z
	.object({
		type: z.literal("coder"),
		bytes: z.instanceof(Uint8Array),
	})
	.merge(CoderMetadata.required())

export type StoredCoder = z.infer<typeof StoredCoder>

export const CoderRegistryContext = createContext<CoderRegistry>()

export function useCoderRegistry() {
	const value = useContext(CoderRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a CoderRegistryContext")
	}
	return value
}

const textCoder = inferCoder(z.object({text: z.string()})).parse({
	id: "text",
	displayName: "Plain Text",
	contentType: "text",
	decode(bytes: Uint8Array) {
		return {text: new TextDecoder().decode(bytes)}
	},
	encode(value: {text: string}) {
		return new TextEncoder().encode(value.text)
	},
	new() {
		return {text: ""}
	},
})

const codeCoder = inferCoder(z.object({text: z.string()})).parse({
	id: "text",
	displayName: "Plain Text",
	contentType: "text",
	decode(bytes: Uint8Array) {
		return {text: new TextDecoder().decode(bytes)}
	},
	encode(value: {text: string}) {
		return new TextEncoder().encode(value.text)
	},
	new() {
		return {text: ""}
	},
})

const defaultCoders = [textCoder]
