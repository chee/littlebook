import {walkImportsAndRequires} from "../babel/walk-imports.ts"

export async function spider(
	url: string,
	deps: Map<string, string> = new Map()
): Promise<Map<string, string>> {
	if (deps.has(url)) return deps
	const res = await fetch(url)
	if (res.ok) {
		const content = await res.text()
		deps.set(url, content)
		await Promise.allSettled(
			walkImportsAndRequires(content, async path => {
				const depUrl = new URL(path, url).toString()
				if (!deps.has(depUrl)) {
					await spider(depUrl, deps)
				}
			})
		)
	}
	return deps
}

export async function fetchXTypescriptTypes(
	specifier: string,
	files: Map<string, string> = new Map()
): Promise<Map<string, string> | undefined> {
	if (files.has(specifier)) {
		return files
	}

	const res = await fetch(specifier, {method: "HEAD"})
	const typesUrl = res.headers.get("x-typescript-types")
	if (!typesUrl) {
		console.debug(`No x-typescript-types header found for ${specifier}`)
		return
	}
	const resolvedTypesUrl = new URL(typesUrl, specifier).toString()
	const typesRes = await fetch(resolvedTypesUrl)
	if (!typesRes.ok) {
		throw new Error(`Failed to fetch types from ${resolvedTypesUrl}`)
	}
	const typesContent = await typesRes.text()
	files.set(specifier, typesContent)
	files.set(resolvedTypesUrl, typesContent)
	await spider(resolvedTypesUrl, files)
	await Promise.allSettled(
		walkImportsAndRequires(typesContent, async path => {
			const depUrl = new URL(path, resolvedTypesUrl).toString()
			if (!files.has(depUrl)) {
				await spider(depUrl, files)
			}
		})
	)

	return files
}
