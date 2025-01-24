import {isValidAutomergeUrl} from "@automerge/automerge-repo"
import {z} from "zod"

export function automergeURL() {
	return z.string().refine(isValidAutomergeUrl, {
		message: "this isn't a valid Automerge URL",
	})
}

export const h = {
	automergeURL,
}
