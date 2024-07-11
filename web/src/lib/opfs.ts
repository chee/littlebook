export async function removeDirectory(dir?: FileSystemDirectoryHandle) {
	if (!dir) {
		// biome-ignore lint/style/noParameterAssign: it's fine
		dir = await navigator.storage.getDirectory()
	}

	console.info(`looking at ${dir.name}`)

	let entries = (await dir.entries()) as AsyncIterable<
		[string, FileSystemDirectoryHandle]
	>

	for await (let [name, entry] of entries) {
		if (entry.kind === "directory") {
			console.info(`iterating over ${name}`)
			await removeDirectory(entry)
			await dir.removeEntry(name)
		} else {
			console.info(`deleting ${name}`)
			await dir.removeEntry(name)
		}
	}
}
