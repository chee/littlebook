import {z} from "zod"
import {Entry} from "./entry.js"
import {DocHandle} from "@automerge/automerge-repo"

// todo these need to be generic so that `file` can be of type
export const FileMenuAction = z.object({
	type: z.literal("action"),
	label: z.string(),
	keybinding: z.string().optional(),
	when: z
		.function()
		.args(z.object({entry: Entry, file: z.unknown()}))
		.returns(z.boolean())
		.optional(),
	action: z
		.function()
		.args(z.object({fileHandle: z.instanceof(DocHandle)}))
		.returns(z.void()),
})

export type FileMenuAction = z.infer<typeof FileMenuAction>

// const baseFileMenuSubMenu = z.object({
// 	type: z.literal("sub"),
// 	label: z.string(),
// 	when: z
// 		.function()
// 		.args(z.object({entry: Entry, file: z.unknown()}))
// 		.returns(z.boolean())
// 		.optional(),
// })

// export type FileMenuSubMenu = z.infer<typeof baseFileMenuSubMenu> & {
// 	sub: FileMenuItem[]
// }

// export const FileMenuSubMenu: z.ZodDiscriminatedUnionOption<"type"> =
// 	baseFileMenuSubMenu.extend({
// 		sub: z.lazy(() => FileMenuAction.array()),
// 	})

export const FileMenuChoice = z.object({
	type: z.literal("choice"),
	value: z
		.function()
		.args(z.object({file: z.unknown()}))
		.returns(z.string()),
	choices: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		})
	),
	action: z
		.function()
		.args(z.object({fileHandle: z.instanceof(DocHandle), value: z.string()}))
		.returns(z.void()),
})

export type FileMenuChoice = z.infer<typeof FileMenuChoice>

export type FileMenuItem = FileMenuSubMenu | FileMenuAction | FileMenuChoice

export const FileMenuItem: z.ZodType<FileMenuItem> = z.lazy(() =>
	z.discriminatedUnion("type", [
		FileMenuSubMenu,
		FileMenuAction,
		FileMenuChoice,
	])
)

// export type FileMenuItem = z.infer<typeof FileMenuItem>

export const FileMenu = FileMenuItem.array()

export type FileMenu = z.infer<typeof FileMenu>

const FileMenuSubMenu = z.object({
	type: z.literal("sub"),
	label: z.string(),
	when: z
		.function()
		.args(z.object({entry: Entry, file: z.unknown()}))
		.returns(z.boolean())
		.optional(),
	sub: FileMenuItem.array(),
}) satisfies z.ZodType<FileMenuSubMenu>

type FileMenuSubMenu = {
	type: "sub"
	label: string
	when?(opts: {entry: Entry; file: unknown}): boolean
	sub: FileMenuItem[]
}
