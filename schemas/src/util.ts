import {isValidAutomergeUrl, type AutomergeUrl} from "@automerge/automerge-repo"
import {
	any,
	args,
	array,
	boolean,
	custom,
	function_,
	intersect,
	literal,
	object,
	pipe,
	returns,
	tuple,
	variant,
	void_,
	type BaseSchema,
	type ErrorMessage,
	type MapSchema,
	type ObjectEntries,
	type ObjectIssue,
	type ObjectSchema,
} from "valibot"

export const automergeURL = custom<string>(
	value => typeof value == "string" && isValidAutomergeUrl(value),
	"not a valid automerge URL"
)

export const bytes = custom<Uint8Array>(
	value => value instanceof Uint8Array,
	"must be a Uint8Array"
)

// a compiled tool as stored in automerge
export function stored<T extends ObjectEntries>(type: string, entries: T) {
	return object({
		type: literal(type),
		bytes: bytes,
		...entries,
	})
}

export function ok<T extends BaseSchema<any, any, any>>(schema: T) {
	return object({
		ok: literal(true),
		val: schema,
	})
}

export const err = object({
	ok: literal(false),
})

export function result<T extends BaseSchema<any, any, any>>(schema: T) {
	return variant("ok", [ok(schema), err])
}
