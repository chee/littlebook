const key = "littlebook:sync-servers"
const storage = window.localStorage

const defaultServers = ["wss://galaxy.observer/", "ws://localhost:11128/"]

function fixServers() {
	const existing = storage.getItem(key) || "[]"
	try {
		const servers = JSON.parse(existing) as string[]
		if (!Array.isArray(servers)) {
			throw new Error("Invalid sync servers format")
		}
		if (servers.length === 0) {
			throw new Error("No sync servers found")
		}
	} catch {
		storage.setItem(key, JSON.stringify(defaultServers))
	}
}

fixServers()

export function getSyncServers(): string[] {
	fixServers()
	return JSON.parse(storage.getItem(key) || "[]") as string[]
}

export default getSyncServers()
