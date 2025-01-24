import {z, type ZodTypeAny} from "zod"
import {jsonSchemaToZod, JsonSchema} from "json-schema-to-zod"
import {zerialize} from "zodex"


// import {zodToJsonSchema} from "zod-to-json-schema"
// import type {AutomergeValue} from "@automerge/automerge/next"

// this is missing Counter and RawString on purpose
// const AutomergeScalar = z.union([
// 	z.string(),
// 	z.number(),
// 	z.null(),
// 	z.boolean(),
// 	z.date(),
// 	z.instanceof(Uint8Array),
// ])

// const AutomergeValue = z.union([
// 	AutomergeScalar,
// 	z.record(AutomergeScalar),
// 	z.array(AutomergeScalar),
// ])

const exampleShape = {
    name: "string",
    records: 
}

export const ContentTypeMetadata = z.object({
	id: z.string(),
	displayName: z.string()
})

export function ContentType<T extends ZodTypeAny>(shape: T) {
	return z.object({
		id: z.string(),
		displayName: z.string(),
		shape
	}).extend(ContentTypeMetadata.shape)
}

export type ContentTypeMetadata = z.infer<typeof ContentTypeMetadata>


export const StoredContentType = z
	.object({
		type: z.literal("type"),
		bytes: z.instanceof(Uint8Array),
	})
	.extend(ContentTypeMetadata.shape)
