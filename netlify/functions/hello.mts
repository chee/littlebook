import {Context} from "@netlify/functions"

export default async (req: Request, context: Context) => {
	return new Response(JSON.stringify(context, null, 2), {
		headers: {"content-type": "application/json"},
	})
}

globalThis.Object = undefined
if (!globalThis.Object) {
	throw 999
} else {
	throw 998
}
