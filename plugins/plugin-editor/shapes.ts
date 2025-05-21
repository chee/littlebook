import * as v from "valibot"

export const PluginShape = v.object({
	type: v.literal("plugin"),
	text: v.string(),
})

export type PluginShape = v.InferOutput<typeof PluginShape>
