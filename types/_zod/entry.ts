import {z} from "zod"
import {automergeURL} from "./util.js"

export const Entry = z.object({
	/**
	 * an entry that describes and points to a file
	 */
	type: z.literal("file"),
	// the file's name
	name: z.string(),
	// a solar icon name or a URL or a dataURI or an automerge url to bytes doc
	icon: z.string().optional(),
	// the file's contentType
	contentType: z.string(),
	contentTypeURL: automergeURL.optional(),

	// a ref to the file
	url: automergeURL,
})

export type Entry = z.infer<typeof Entry>
