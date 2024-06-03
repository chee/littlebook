import {} from "@automerge/automerge/next"
import {Repo} from "@automerge/automerge-repo"
import {OPFSStorageAdapter} from "@openscript-ch/automerge-repo-storage-opfs"
import {MessageChannelNetworkAdapter} from "@automerge/automerge-repo-network-messagechannel"

export function repo() {
	const worker = new SharedWorker(
		new URL("./automerge.worker.ts", import.meta.url),
		{
			type: "module",
			name: "automerge-repo-shared-worker",
		},
	)

	return new Repo({
		network: [new MessageChannelNetworkAdapter(worker.port)],
		storage: new OPFSStorageAdapter("book"),
		sharePolicy: async peerId => peerId.includes("worker"),
	})
}
