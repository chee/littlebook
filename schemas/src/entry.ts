import {literal, object, string, type z} from "zod"
import {automergeURL} from "./util.js"

export const Entry = object({
	/**
	 * an entry that describes and points to a file
	 */
	type: literal("file"),
	// the file's name
	name: string(),
	// a solar icon name or a URL or a dataURI or an automerge url to bytes doc
	icon: string().optional(),
	// the file's contentType
	contentType: string(),
	contentTypeURL: automergeURL.optional(),

	// a ref to the file
	url: automergeURL,
})

export type Entry = z.infer<typeof Entry>
