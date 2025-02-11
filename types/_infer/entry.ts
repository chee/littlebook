import {automergeURL} from "./util.js"
import * as v from "valibot"

export const Entry = v.object({
	/**
	 * an entry that describes and points to a file
	 */
	type: v.literal("file"),
	// the file's name
	name: v.string(),
	// a solar icon name or a URL or a dataURI or an automerge url to bytes doc
	icon: v.optional(v.string()),
	// the file's contentType
	contentType: v.string(),
	contentTypeURL: v.optional(automergeURL),

	// a ref to the file
	url: automergeURL,
})

export type Entry = v.InferOutput<typeof Entry>
