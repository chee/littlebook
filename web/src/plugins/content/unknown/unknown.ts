import * as coders from "../../../contents/coders.ts"
import {UniformType} from "../../../contents/uniform-type.ts"

export default function unknown(lb: lb.plugins.API) {
	lb.registerCoder(UniformType.data, coders.binary())
}
