import UniformType, {type UniformTypeIdentifier} from "./uniform-type.ts"

export class CodingError extends Error {}
export class EncodingError extends CodingError {}
export class DecodingError extends CodingError {}

// todo maybe Coders should have display names
// todo and indicate if they are creatable/newable
// todo because, say, a PDF is not. i suppose if something
// todo has only a preview and not an editor then it is
// todo not creatable?
export interface ContentCoder<Model extends lb.AnyContentValue> {
	decode(bytes: Uint8Array): Model | DecodingError
	encode(model: Model): Uint8Array | EncodingError
}
export interface AsyncContentCoder<Model extends lb.AnyContentValue> {
	decode(bytes: Uint8Array): Promise<Model | DecodingError>
	encode(model: Model): Promise<Uint8Array | EncodingError>
}

const utf8Encoder = new TextEncoder()
const utf8Decoder = new TextDecoder()

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
				const json = text().decode(bytes)
				return json instanceof DecodingError ? json : JSON.parse(json)
			} catch (error) {
				console.error(error)
				return new DecodingError("json")
			}
		},
	}
}

export class ContentCoderRegistry {
	private registry = new Map<UniformTypeIdentifier, ContentCoder<any>>()

	register<Type extends lb.AnyContentValue>(
		uniformType:
			| UniformType
			| UniformTypeIdentifier
			| (UniformType | UniformTypeIdentifier)[],
		coder: ContentCoder<Type>,
	) {
		this.registerAll(
			Array.isArray(uniformType) ? uniformType : [uniformType],
			coder,
		)
	}

	registerAll<Type extends lb.AnyContentValue>(
		uniformTypes: (UniformType | UniformTypeIdentifier)[],
		coder: ContentCoder<Type>,
	) {
		for (const type of uniformTypes) {
			const typeName = UniformType.getIdentifier(type)
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
		type: UniformTypeIdentifier | UniformType,
	) {
		const uniformType = UniformType.get(type)
		const direct = registry.get(uniformType.identifier)
		if (direct) {
			yield direct
		}
		for (const [registeredType, coder] of registry.entries()) {
			if (uniformType.conforms(UniformType.get(registeredType))) {
				yield coder
			}
		}
	}

	get(type: UniformTypeIdentifier | UniformType) {
		return this.getstar(this.registry, type)
	}

	getFirst(type: UniformTypeIdentifier | UniformType) {
		return this.get(type).next().value
	}

	getExact(type: UniformTypeIdentifier | UniformType) {
		return this.registry.get(UniformType.getIdentifier(type))
	}

	remove(type: UniformTypeIdentifier | UniformType, coder: ContentCoder<any>) {
		const identifier = UniformType.getIdentifier(type)
		if (this.registry.get(identifier) == coder) {
			this.registry.delete(identifier)
		} else {
			// todo throw or just silently accept?
		}
	}

	getAllTypes() {
		return this.registry.keys()
	}
}

export const coderRegistry = new ContentCoderRegistry()
