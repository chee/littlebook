import {array, literal, object, string, union, z, ZodTypeAny} from "zod"

export function stdSuccess<T extends ZodTypeAny>(schema: T) {
	return object({
		value: schema,
		issues: z.undefined(),
	})
}

export const stdFailure = object({
	issues: array(string()).readonly(),
})

export function stdResult<T extends ZodTypeAny>(schema: T) {
	return union([stdSuccess(schema), stdFailure])
}

export function stdSchema<T extends ZodTypeAny>(schema: T) {
	return object({
		"~standard": object({
			validate: z.function().args().returns(stdResult(schema)),
			version: literal(1),
			vendor: string(),
		}),
	})
}
