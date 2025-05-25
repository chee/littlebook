import type {LittlebookFileTree} from "../../shapes/shapes.ts"

export type VirtualFileSystem = {
	[key: string]: string
}

export function littlebookFileTreeToVirtualFileSystem(
	src: LittlebookFileTree,
	prefix = "",
	files?: Record<string, string>
): VirtualFileSystem {
	if (!files) files = {}
	for (const [key, value] of Object.entries(src)) {
		const path = prefix ? [prefix, key].join("/") : key
		if (typeof value == "string") files[path] = value
		else if (typeof value == "object" && value !== null)
			littlebookFileTreeToVirtualFileSystem(value, path, files)
	}
	return files
}
