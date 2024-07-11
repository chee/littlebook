import UniformType, {
	type ResolvableUniformTypes,
} from "../files/contents/uniform-type.ts"

import {
	text,
	json,
	binary,
	coderRegistry,
} from "../files/contents/content-coders.ts"

export function registerContentCoder(
	types: ResolvableUniformTypes,
	coder: lb.ContentCoder<any>,
) {
	coderRegistry.register(types, coder)
	return () => coderRegistry.remove(types, coder)
}

export let coders = {text, json, binary}
export {UniformType}
