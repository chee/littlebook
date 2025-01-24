// https://github.com/ocwg/spec/blob/main/schema/open-canvas.schema.json
export interface OpenCanvas {
	schema_version: string
	nodes: OpenCanvasNode[]
	relations?: OpenCanvasRelation[]
	schemas?: OpenCanvasSchema[]
	resources?: Record<string, unknown>
}

type Dimensions = [number, number] | [number, number, number]

interface Property {
	schema: string
	schema_version: string
	[key: string]: unknown
}

// https://github.com/ocwg/spec/blob/main/schema/node.schema.json
export interface OpenCanvasNode {
	id: string
	position: Dimensions
	size?: Dimensions
	rotation?: number
	properties?: Property[]
}

type OCWGSet = {
	schema: "@ocwg/set"
	schema_version: string
	members: string[]
}

type OCWGEdge = {
	schema: "@ocwg/edge"
	schema_version: string
	from: string
	to: string
}

// https://github.com/ocwg/spec/blob/main/schema/relation.schema.json
export interface OpenCanvasRelation {
	name: string
	id: string
	properties: (OCWGSet | OCWGEdge)[]
}

// https://github.com/ocwg/spec/blob/main/schema/schemas.schema.json
export interface OpenCanvasSchema {
	// key must start with @
	[key: string]: {
		$schema: string
		[key: string]: unknown
	}
}
