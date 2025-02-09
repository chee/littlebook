import * as v from "valibot"
import type {BaseSchemaAny} from "./util.js"

export function stdSuccess<T extends BaseSchemaAny>(schema: T) {
	return v.object({
		value: schema,
		issues: v.undefined(),
	})
}

export const stdFailure = v.object({
	issues: v.pipe(v.array(v.string()), v.readonly()),
})

export function stdResult<T extends BaseSchemaAny>(schema: T) {
	return v.union([stdSuccess(schema), stdFailure])
}

export function stdSchema<T extends BaseSchemaAny>(schema: T) {
	return v.object({
		"~standard": v.object({
			validate: v.pipe(v.function(), v.returns(stdResult(schema))),
			version: v.literal(1),
			vendor: v.string(),
		}),
	})
}
