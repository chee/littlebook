import {UTIController} from "uti"
const UTI = new UTIController()

export const unknown = "public.data" as lb.UniformTypeIdentifier

export function register(type: lb.UniformType) {
	UTI.register([type])
}

export function registerAll(types: lb.UniformType[]) {
	UTI.register(types)
}

export function conformsTo(
	a: lb.UniformTypeIdentifier,
	b: lb.UniformTypeIdentifier,
) {
	return UTI.conformsTo(a, b)
}

export function conformsToAny(
	target: lb.UniformTypeIdentifier,
	types: lb.UniformTypeIdentifier[],
) {
	return types.some(type => conformsTo(target, type))
}

export function handles(
	type: lb.UniformTypeIdentifier,
	filename: lb.File["name"],
) {
	return UTI.fileNameConformsTo(filename, type)
}

export function as(type: string) {
	return type as lb.UniformTypeIdentifier
}

export function forFilename(filename: lb.File["name"]) {
	return Array.from(
		new Set(UTI.getUTIsForFileName(filename) as lb.UniformTypeIdentifier[]),
	)
}

export function forMime(mimetype: string) {
	return Array.from(
		new Set(UTI.getUTIsForMimeType(mimetype) as lb.UniformTypeIdentifier[]),
	)
}

export function associate(
	type: lb.UniformTypeIdentifier,
	extensions: string[],
) {
	UTI.assignExtensions(type, extensions)
}

export function associateMime(
	type: lb.UniformTypeIdentifier,
	mimetypes: string[],
) {
	UTI.assignMimeTypes(type, mimetypes)
}

const displayNames = new Map<lb.UniformTypeIdentifier, string>()

export function getDisplayName(type: lb.UniformTypeIdentifier) {
	return displayNames.get(type) || type
}

export function setDisplayName(type: lb.UniformTypeIdentifier, name: string) {
	displayNames.set(type, name)
}

export function extensionsFor(target: lb.UniformTypeIdentifier) {
	for (const [type, exts] of UTI.utiByFileNameExtension.entries()) {
		if (type == target) {
			return exts
		}
	}
}

export function getFilenameParts(
	target: lb.UniformTypeIdentifier,
	fullFilename: string,
): [string, string?] {
	const m = fullFilename.match(/(\.[\.a-zA-Z_0-9]+)$/)

	if (m) {
		for (
			let extension = m[1];
			extension.length > 0;
			extension = extension.replace(/^\.[a-zA-Z_0-9]+/, "")
		) {
			if (UTI.utiByFileNameExtension.get(extension)?.includes(target)) {
				return [
					fullFilename.slice(0, fullFilename.length - extension.length),
					extension.slice(1),
				]
			}
		}
	}

	return [fullFilename]
}

const typeRegistry = {
	conformsTo,
	conformsToAny,
	handles,
	as,
	register,
	registerAll,
	forFilename,
	forMime,
	associate,
	associateMime,
	getDisplayName,
	setDisplayName,
	extensionsFor,
	getFilenameParts,
}
export default typeRegistry
