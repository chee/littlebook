import * as v from "valibot"

export const PluginShape = v.object({
	type: v.literal("plugin"),
	text: v.string(),
})

// export const PluginShape = v.object({
// 	package: v.string(),
// 	tsconfig: v.string(),
// 	javascript: v.string(),
// 	css: v.string(),
// })

export type PluginShape = v.InferOutput<typeof PluginShape>
