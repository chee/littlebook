import {literal, object, optional, string, type InferOutput} from "valibot"
import {automergeURL} from "./util.js"

export const Entry = object({
	/**
	 * an entry that describes and points to a file
	 */
	type: literal("file"),
	// the file's name
	name: string(),
	// a solar icon name or a URL
	icon: optional(string()),
	// the file's contentType
	contentType: string(),
	contentTypeURL: optional(automergeURL),

	// a ref to the file
	url: automergeURL,
})

export type Entry = InferOutput<typeof Entry>
