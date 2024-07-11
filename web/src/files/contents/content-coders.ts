import {contentCoderActivators, pluginStore} from "../../plugins/plugins.ts"
import UniformType, {
	type ResolvableUniformType,
	type ResolvableUniformTypes,
	type UniformTypeIdentifier,
} from "./uniform-type.ts"

export class CodingError extends Error {}
export class EncodingError extends CodingError {}
export class DecodingError extends CodingError {}

// todo maybe Coders should have display names
export interface ContentCoder<Model extends lb.AnyContentValue> {
	description?: string
	decode(bytes: Uint8Array): Model | DecodingError
	encode(model: Model): Uint8Array | EncodingError
}
export interface AsyncContentCoder<Model extends lb.AnyContentValue> {
	description?: string
	decode(bytes: Uint8Array): Promise<Model | DecodingError>
	encode(model: Model): Promise<Uint8Array | EncodingError>
}

let utf8Encoder = new TextEncoder()
let utf8Decoder = new TextDecoder()

export function text(): ContentCoder<string> {
	return {
		encode: string => {
			try {
				return utf8Encoder.encode(string)
			} catch (error) {
				console.error(error)
				return new EncodingError((error as Error).message || (error as string))
			}
		},
		decode: bytes => {
			try {
				return utf8Decoder.decode(bytes)
			} catch (error) {
				console.error(error)
				return new DecodingError((error as Error).message || (error as string))
			}
		},
	}
}

export function binary(): ContentCoder<Uint8Array> {
	return {
		encode: bytes => bytes,
		decode: bytes => bytes,
	}
}

export function json<Type extends lb.AnyContentValue>(): ContentCoder<Type> {
	return {
		encode(data) {
			try {
				return text().encode(JSON.stringify(data, null, "\t"))
			} catch (error) {
				console.error(error)
				return new EncodingError("json")
			}
		},
		decode(bytes) {
			try {
				let json = text().decode(bytes)
				return json instanceof DecodingError ? json : JSON.parse(json)
			} catch (error) {
				console.error(error)
				return new DecodingError("json")
			}
		},
	}
}

type AnyContentCoder = ContentCoder<any> | AsyncContentCoder<any>

export class ContentCoderRegistry {
	private registry = new Map<UniformTypeIdentifier, AnyContentCoder>()

	register(uniformType: ResolvableUniformTypes, coder: AnyContentCoder) {
		this.registerAll(
			Array.isArray(uniformType) ? uniformType : [uniformType],
			coder,
		)
	}

	registerAll(uniformTypes: ResolvableUniformType[], coder: AnyContentCoder) {
		for (let type of uniformTypes) {
			let typeName = UniformType.getIdentifier(type)
			if (this.registry.get(typeName)) {
				throw new Error(
					`there is already a coder for ${typeName}. remove it first`,
				)
			}
			this.registry.set(typeName, coder)
		}
	}

	getstar = function* (
		registry: ContentCoderRegistry["registry"],
		type: ResolvableUniformType,
	) {
		let uniformType = UniformType.get(type)

		let direct = registry.get(uniformType.identifier)
		if (direct) {
			yield direct
		}
		for (let [registeredType, coder] of registry.entries()) {
			// todo make .supertypes a set of identifiers, rather than uniform types
			if (uniformType.conforms(UniformType.get(registeredType))) {
				yield coder
			}
		}
	}

	get(type: ResolvableUniformType) {
		return this.getstar(this.registry, type)
	}

	getFirst(type: ResolvableUniformType) {
		return this.get(type).next().value
	}

	getExact(type: ResolvableUniformType) {
		return this.registry.get(UniformType.getIdentifier(type))
	}

	remove(types: ResolvableUniformTypes, coder: AnyContentCoder) {
		for (let type of Array.isArray(types) ? types : [types]) {
			let identifier = UniformType.getIdentifier(type)
			if (this.registry.get(identifier) == coder) {
				this.registry.delete(identifier)
			} else {
				// todo throw or just silently accept?
			}
		}
	}

	getAllTypes() {
		return this.registry.keys()
	}

	async request(identifier: UniformTypeIdentifier) {
		let [plugins] = pluginStore
		let activator = plugins.coders[identifier]
		if (activator) {
			return activator.activate()
		}
		console.warn(`can't activate coder:${identifier}. she never `)
	}
}

export let coderRegistry = new ContentCoderRegistry()

coderRegistry.register(UniformType.plainText, text())
