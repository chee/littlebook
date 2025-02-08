import {
	array,
	function_,
	literal,
	object,
	pipe,
	readonly,
	returns,
	string,
	undefined_,
	union,
	type BaseSchema,
} from "valibot"

export function stdSuccess<T extends BaseSchema<any, any, any>>(schema: T) {
	return object({
		value: schema,
		issues: undefined_(),
	})
}

export const stdFailure = object({
	issues: pipe(array(string()), readonly()),
})

export function stdResult<T extends BaseSchema<any, any, any>>(schema: T) {
	return union([stdSuccess(schema), stdFailure])
}

export function stdSchema<T extends BaseSchema<any, any, any>>(schema: T) {
	return object({
		"~standard": object({
			validate: pipe(function_(), returns(stdResult(schema))),
			version: literal(1),
			vendor: string(),
		}),
	})
}
