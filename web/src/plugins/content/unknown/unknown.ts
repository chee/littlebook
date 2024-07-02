import * as coders from "../../../files/content-coders.ts"
import UniformType from "../../../files/uniform-type.ts"

export default function unknown(lb: lb.plugins.API) {
	lb.registerCoder(UniformType.data, coders.binary())
}
