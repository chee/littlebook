import {isValidAutomergeUrl} from "@automerge/vanillajs"
import {z, type ZodTypeAny} from "zod"

export function automergeURL() {
	return z.string().refine(isValidAutomergeUrl, {
		message: "this isn't a valid Automerge URL",
	})
}

export const ok = <T extends ZodTypeAny>(shape: T) => {
	return z.object({
		ok: z.literal(true),
		val: shape,
	})
}
export const err = <T extends ZodTypeAny>(_: T) => {
	return z.object({
		ok: z.literal(false),
		err: z.instanceof(Error),
	})
}
export const result = <T extends ZodTypeAny>(shape: T) => {
	return z.discriminatedUnion("ok", [ok<T>(shape), err<T>(shape)])
}

export const h = {
	automergeURL,
	ok,
	err,
	result,
}
