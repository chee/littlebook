import {coderRegistry} from "./types/content-type-registry.ts"

export default function createContentsAPI() {
	return {
		convert<
			From extends lb.UniformTypeIdentifier,
			To extends lb.UniformTypeIdentifier,
		>(from: lb.Content<{contentType: From}>, to: To) {
			const tocoder = coderRegistry.get(to)
			const fromcoder = coderRegistry.get(from.contentType)

			if (tocoder && fromcoder) {
				tocoder.decode(fromcoder.encode(from)) satisfies lb.Content<To>
			} else {
				throw new Error(
					`can't convert to and fro with from:${from.contentType} and to:${to} when they are not both installed`,
				)
			}
		},
	}
}
