export class CodingError extends Error {}
export class EncodingError extends CodingError {}
export class DecodingError extends CodingError {}

export interface ContentCoder<Model extends lb.AnyContent> {
	decode(bytes: Uint8Array): Model | DecodingError
	encode(model: Model): Uint8Array | EncodingError
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
				return new EncodingError((error as Error).message || (error as string))
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

export function json<Type extends lb.AnyContent>(): ContentCoder<Type> {
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
