import type {StandardSchemaV1} from "@standard-schema/spec"

export interface ContentType<Shape> {
	id: string
	displayName: string
	conformsTo?: string[]
	icon?: string
	schema: StandardSchemaV1<Shape>
}
