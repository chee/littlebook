import {cbor} from "@automerge/vanillajs"

export async function compressString(
	string: string,
	format: CompressionFormat = "deflate-raw",
): Promise<Uint8Array> {
	const compressor = new CompressionStream(format)
	return await new Response(
		new Blob([string]).stream().pipeThrough(compressor),
	).bytes()
}

export async function decompressString(
	bytes: Uint8Array,
	format: CompressionFormat = "deflate-raw",
): Promise<string> {
	const ds = new DecompressionStream(format)
	return await new Response(new Blob([bytes]).stream().pipeThrough(ds)).text()
}

export function uint8arraytobase64(uint8array: Uint8Array) {
	const binaryString = String.fromCharCode.apply(
		null,
		uint8array as unknown as number[],
	)
	return btoa(binaryString)
}

export function base64touint8array(base64: string) {
	const binaryString = atob(base64)
	const len = binaryString.length
	const bytes = new Uint8Array(len)
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i)
	}
	return bytes
}

export async function encode(string: string) {
	return uint8arraytobase64(await compressString(string, "deflate-raw"))
}

export async function compressJSON(object: unknown) {
	return await encode(JSON.stringify(object as object))
}

export async function decode(base64: string) {
	return await decompressString(base64touint8array(base64), "deflate-raw")
}

export async function decompressJSON<T>(base64: string) {
	return JSON.parse(await decode(base64)) as T
}

export function encodeJSON(object: unknown) {
	return uint8arraytobase64(cbor.encode(object as object))
}

export function decodeJSON<T>(base64: string) {
	return cbor.decode(base64touint8array(base64)) as T
}
