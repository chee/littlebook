import {z} from "zod"

export function stdSuccess<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		value: schema,
		issues: z.undefined(),
	})
}

export const stdFailure = z.object({
	issues: z.array(z.string()).readonly(),
})

export function stdResult<T extends z.ZodTypeAny>(schema: T) {
	return z.union([stdSuccess(schema), stdFailure])
}

export function stdSchema<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		"~standard": z.object({
			validate: z.function().returns(stdResult(schema)),
			version: z.literal(1),
			vendor: z.string(),
		}),
	})
}
