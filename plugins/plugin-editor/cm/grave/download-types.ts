/**********************************************************************************/
/*                                                                                */
/*                                       Misc                                     */
/*                                                                                */
/**********************************************************************************/

import {resolvePath, transformModulePaths} from "@bigmistqke/repl"

function isUrl(path: string) {
	return (
		path.startsWith("blob:") ||
		path.startsWith("http:") ||
		path.startsWith("https:")
	)
}

function isRelativePath(path: string) {
	return path.startsWith(".")
}

const extensions = [
	".js.d.ts",
	".jsx.d.ts",
	".ts.d.ts",
	".tsx.d.ts",
	".js",
	".jsx",
	".tsx",
]

function normalizePath(path: string) {
	for (const extension of extensions) {
		if (path.endsWith(extension)) {
			return path.replace(extension, ".d.ts")
		}
	}
	return path
}

/**********************************************************************************/
/*                                                                                */
/*                             Download Types From Url                            */
/*                                                                                */
/**********************************************************************************/

const URL_CACHE = new Map<string, Promise<string>>()

/**
 * Imports type definitions from a URL, checking if the types are already cached before importing.
 *
 * @param url The URL of the type definition to import.
 * @param [packageName] The package name associated with the type definitions.
 * @returns
 * @async
 */
export async function downloadTypesFromUrl({
	url,
	declarationFiles = {},
	original,
}: {
	url: string
	declarationFiles?: Record<string, string>
	original?: string
}): Promise<Record<string, string>> {
	async function downloadPath(path: string) {
		if (URL_CACHE.has(path)) return await URL_CACHE.get(path)!
		const {promise, resolve} = Promise.withResolvers<string>()
		URL_CACHE.set(path, promise)

		const response = await fetch(path)
		if (response.status !== 200) {
			throw new Error(`Error while loading ${url}`)
		}
		const code = await response.text()

		resolve(code)

		const promises = new Array<Promise<unknown>>()

		const transformedCode = transformModulePaths(code, modulePath => {
			if (isRelativePath(modulePath)) {
				const newPath = resolvePath(path, modulePath)
				promises.push(downloadPath(normalizePath(newPath)))

				return normalizePath(modulePath)
			} else if (isUrl(modulePath)) {
				promises.push(
					downloadTypesFromUrl({
						url: modulePath,
						declarationFiles,
					}),
				)
				return modulePath
			} else {
				promises.push(
					downloadTypesfromPackage({
						url: modulePath,
						declarationFiles,
					}),
				)
			}
			return modulePath
		})

		await Promise.all(promises)

		if (!transformedCode) {
			throw new Error(`Error while transforming ${url}`)
		}

		declarationFiles[path] = transformedCode
		if (original) declarationFiles[original] = transformedCode
	}

	await downloadPath(url)

	return declarationFiles
}

/**********************************************************************************/
/*                                                                                */
/*                           Download Types From Package                          */
/*                                                                                */
/**********************************************************************************/

const TYPE_URL_CACHE = new Map<string, Promise<string | null>>()

/**
 * Imports type definitions based on a package name by resolving it to a CDN path.
 *
 * @param packageName The package name whose types to import.
 * @returns
 * @async
 */
export async function downloadTypesfromPackage({
	url,
	declarationFiles = {},
}: {
	url: string
	declarationFiles?: Record<string, string>
}) {
	const typeUrl = await (TYPE_URL_CACHE.get(url) ??
		TYPE_URL_CACHE.set(
			url,
			fetch(url)
				.then(result => result.headers.get("X-TypeScript-Types"))
				.catch(error => {
					console.info(error)
					return null
				}),
		).get(url))

	if (!typeUrl) throw `No type url was found for package ${url}`
	const types = await downloadTypesFromUrl({
		url: typeUrl,
		declarationFiles,
	})

	return {
		path: typeUrl,
		types: types,
		original: url,
	}
}
