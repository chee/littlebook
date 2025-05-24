import type {DocHandle, Prop} from "@automerge/vanillajs"
import type {LittlebookPluginShape} from "../shapes/shapes.ts"
import type {Doc} from "@automerge/automerge"

export type LBPSrcPath = ["src", ...Prop[]]
export type LBPSrcFilePath = ["src", ...Prop[], string]

export function getTypescriptEnvPath({
	handle,
	path,
}: {
	handle: DocHandle<LittlebookPluginShape>
	path: LBPSrcFilePath
}) {
	const automerge = handle.url
	return `/${automerge}/${path.join("/")}`
}

export function getExtension({path}: {path: Prop[]}) {
	const last = path[path.length - 1]
	if (typeof last != "string") {
		throw new Error("filename isn't a string? impossible!")
	}
	const lastIndex = last.lastIndexOf(".")
	if (lastIndex == -1) {
		// todo maybe this isn't an error
		throw new Error("File has no extension!")
	}
	return lastIndex == -1 ? "" : last.slice(lastIndex + 1)
}

export function getFileContent({
	handle,
	path,
}: {
	handle: DocHandle<LittlebookPluginShape>
	path: ["src", ...Prop[]]
}) {
	const content = getProperty(handle.doc(), path)
	if (typeof content !== "string") {
		return
	}
	return content
}

export function getFileContentWithJSXPragma({
	handle,
	path,
}: {
	handle: DocHandle<LittlebookPluginShape>
	path: ["src", ...Prop[]]
}) {
	const content = getProperty(handle.doc(), path)
	if (typeof content !== "string") {
		// console.warn(`File at ${path.join("/")} is not a string!`)
		return
	}
	const meta = handle.doc().meta
	if (meta.jsxImportSource) {
		return `/** @jsxRuntime automatic*/\n/** @jsxImportSource ${meta.jsxImportSource} */\n${content}`
	}
	return content
}

export function getProperty(
	obj: any,
	path: (string | number)[]
): string | undefined {
	let current = obj
	for (const key of path) {
		if (current == null || typeof current !== "object") return undefined
		current = current[key]
	}
	return typeof current === "string" ? current : undefined
}

export function setProperty(
	obj: any,
	path: (string | number)[],
	value: string | number | undefined
): void {
	let current = obj
	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i]
		if (current[key] == null || typeof current[key] !== "object") {
			current[key] = {}
		}
		current = current[key]
	}
	if (value === undefined) {
		delete current[path[path.length - 1]]
	} else {
		current[path[path.length - 1]] = value
	}
}

export function join(...parts: string[]): string {
	const segments: string[] = []

	for (const part of parts) {
		for (const token of part.split("/")) {
			if (!token || token === ".") continue
			if (token === "..") {
				if (segments.length && segments[segments.length - 1] !== "..") {
					segments.pop()
				} else {
					segments.push("..")
				}
			} else {
				segments.push(token)
			}
		}
	}

	const result = segments.join("/")
	const startsWithSlash = parts[0]?.startsWith("/")
	return (startsWithSlash ? "/" : "") + result || (startsWithSlash ? "/" : ".")
}

export function dirname(path: string): string {
	const lastSlashIndex = path.lastIndexOf("/")
	if (lastSlashIndex === -1) return "."
	return path.slice(0, lastSlashIndex)
}

export function cd(base: string, rel: string): string {
	if (rel.startsWith("/")) return rel
	return join(dirname(base), rel)
}

export function findEntryFileName(doc: Doc<LittlebookPluginShape>) {
	if ("entry.tsx" in doc.src) {
		return "entry.tsx"
	} else if ("entry.ts" in doc.src) {
		return "entry.ts"
	} else if ("entry.jsx" in doc.src) {
		return "entry.jsx"
	} else if ("entry.js" in doc.src) {
		return "entry.js"
	}

	throw new Error(
		`No entry file found in plugin. Expected "entry.tsx", "entry.ts", "entry.jsx", or "entry.js".`
	)
}
