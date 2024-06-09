export interface ContentCoder<Model extends lb.AnyContent> {
	decode(bytes: Uint8Array): Model
	encode(model: Model): Uint8Array
}

const utf8Encoder = new TextEncoder()
const utf8Decoder = new TextDecoder()

export function text(): ContentCoder<string> {
	return {
		encode: string => utf8Encoder.encode(string),
		decode: bytes => utf8Decoder.decode(bytes),
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
			return utf8Encoder.encode(JSON.stringify(data, null, "\t"))
		},
		decode(json) {
			return JSON.parse(utf8Decoder.decode(json))
		},
	}
}
