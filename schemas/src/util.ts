import {AutomergeUrl, isValidAutomergeUrl} from "@automerge/automerge-repo"
import * as v from "valibot"

export type BaseSchemaAny = v.BaseSchema<any, any, any>
export type ObjectSchemaAny = v.ObjectSchema<any, any>

export const automergeURL = v.custom<AutomergeUrl>(isValidAutomergeUrl)

export const bytes = v.instance(Uint8Array)

// a compiled tool as stored in automerge
export function stored<T extends v.ObjectEntries>(type: string, metadata: T) {
	return v.object({
		type: v.literal(type),
		bytes: bytes,
		...metadata,
	})
}

export function ok<T extends BaseSchemaAny>(schema: T) {
	return v.object({
		ok: v.literal(true),
		val: schema,
	})
}

export const err = v.object({
	ok: v.literal(false),
})

export function result<T extends BaseSchemaAny>(schema: T) {
	return v.variant("ok", [ok(schema), err])
}
