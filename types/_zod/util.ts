import {AutomergeUrl, isValidAutomergeUrl} from "@automerge/automerge-repo"
import {z, type ZodTypeAny} from "zod"

export const automergeURL = z.custom<AutomergeUrl>(isValidAutomergeUrl)

export const bytes = z.custom<Uint8Array>(val => val instanceof Uint8Array)

// a compiled tool as stored in automerge
export function stored<Metadata extends z.ZodRawShape>(
	type: string,
	metadata: Metadata
) {
	return z
		.object({
			type: z.literal(type),
			bytes: bytes,
		})
		.extend(metadata)
}

export function ok<T extends ZodTypeAny>(schema: T) {
	return z.object({
		ok: z.literal(true),
		val: schema,
	})
}

export const err = z.object({
	ok: z.literal(false),
})

export function result<T extends ZodTypeAny>(schema: T) {
	return z.discriminatedUnion("ok", [ok(schema), err])
}
