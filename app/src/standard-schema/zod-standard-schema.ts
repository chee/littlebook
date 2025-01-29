import {z} from "zod"

export function success<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		value: schema,
		issues: z.undefined(),
	})
}

export const failure = z.object({
	issues: z.array(z.string()).readonly(),
})

export function result<T extends z.ZodTypeAny>(schema: T) {
	return z.union([success(schema), failure])
}

export function schema<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		"~standard": z.object({
			validate: z.function().args(z.unknown()).returns(result(schema)),
			version: z.literal(1),
			vendor: z.string(),
		}),
	})
}
