import {UniformType} from "../../plugin-api.ts"

export default function (lb: lb.plugins.API) {
	lb.registerCoder<Uint8Array>(UniformType.pdf, {
		encode(bytes) {
			return bytes
		},
		decode(bytes) {
			return bytes
		},
	})
}
