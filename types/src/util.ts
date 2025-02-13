import {
	AutomergeUrl,
	DocHandle,
	isValidAutomergeUrl,
} from "@automerge/automerge-repo"
import type {StandardSchemaV1} from "@standard-schema/spec"
import * as v from "valibot"

export type MaybePromise<T> = T | Promise<T>

export function promise<T extends v.GenericSchema>(val: T) {
	return v.pipeAsync(v.promise(), v.awaitAsync(), val)
}

export function maybePromise<T extends v.GenericSchema>(val: T) {
	return v.unionAsync([val, promise(val)])
}

export function arg<T extends v.GenericSchema>(arg: T) {
	return v.args(v.tuple([arg] as const))
}

export function args<T extends v.GenericSchema[]>(...args: T) {
	return v.args(v.tuple(args))
}

export function standard<Shape extends StandardSchemaV1>(schema: Shape) {
	return v.pipe(
		v.custom<StandardSchemaV1.InferOutput<Shape>>(() => true),
		v.rawTransform(({dataset, NEVER, addIssue}) => {
			const result = schema["~standard"].validate(dataset.value)

			if (result instanceof Promise) {
				addIssue({
					message: "A content-type schema cannot be async",
				})
				return NEVER
			}
			if ("issues" in result) {
				addIssue({
					message: "Invalid content-type schema",
				})
				return NEVER
			}
			return result.value as Shape
		})
	) as v.GenericSchema<StandardSchemaV1.InferOutput<Shape>>
}

export const automergeURL = v.custom<AutomergeUrl>(isValidAutomergeUrl)

export const bytes = v.custom<Uint8Array>(val => val instanceof Uint8Array)

// a compiled tool as stored in automerge
export function stored<Metadata extends v.ObjectEntries>(
	type: string,
	metadata: Metadata
) {
	return v.object({
		type: v.literal(type),
		bytes: bytes,
		...metadata,
	})
}

export function ok<T extends v.GenericSchema>(schema: T) {
	return v.object({
		ok: v.literal(true),
		val: schema,
	})
}

export const err = v.object({
	ok: v.literal(false),
})

export function result<T extends v.GenericSchema>(schema: T) {
	return v.variant("ok", [ok(schema), err])
}

export type Err = v.InferOutput<typeof err>
export type Ok<T> = v.InferOutput<ReturnType<typeof ok<v.GenericSchema<T>>>>

export type Result<T> = v.InferOutput<
	ReturnType<typeof result<v.GenericSchema<T>>>
>
