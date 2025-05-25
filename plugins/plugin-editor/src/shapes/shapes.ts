import * as v from "valibot"

export type LittlebookFileTree = {[key: string]: string | LittlebookFileTree}

const fileTree: v.GenericSchema<LittlebookFileTree> = v.record(
	v.string(),
	v.union([v.string(), v.lazy(() => fileTree)])
)

const scalar = v.union([
	v.string(),
	v.number(),
	v.boolean(),
	v.instance(Uint8Array),
	v.date(),
	v.null(),
])
type Scalar = string | number | boolean | Uint8Array | Date | null

type Configish = {[key: string]: Scalar | Configish | Configish[] | Scalar[]}

const configish: v.GenericSchema<Configish> = v.record(
	v.string(),
	v.union([
		v.lazy(() => configish),
		v.array(v.lazy(() => configish)),
		scalar,
		v.array(scalar),
	])
)

export const LittlebookPluginShape = v.object({
	type: v.literal("plugin"),
	meta: configish,
	src: fileTree,
})

export type LittlebookPluginShape = v.InferOutput<typeof LittlebookPluginShape>
