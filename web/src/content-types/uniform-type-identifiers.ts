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
	return UTI.getUTIsForFileName(filename) as lb.UniformTypeIdentifier[]
}

export function forMime(mimetype: string) {
	return UTI.getUTIsForMimeType(mimetype) as lb.UniformTypeIdentifier[]
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
}
export default typeRegistry
