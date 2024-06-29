import type {Doc} from "@automerge/automerge"
import * as Automerge from "@automerge/automerge"
import {useMachine} from "@xstate/solid"

import {
	type SyncMachineConfig,
	createSyncMachine,
	deserializeUint8ArrayUpdates,
	serializeUint8ArrayUpdates,
} from "secsync"
import {createSignal, splitProps} from "solid-js"

export type AutomergeSyncConfig<T> = Omit<
	SyncMachineConfig,
	| "applySnapshot"
	| "applyChanges"
	| "applyEphemeralMessage"
	| "serializeChanges"
	| "deserializeChanges"
> & {
	initialDoc: Doc<T>
}

export type SyncDocParams<T> = {
	doc: T
}

export const useAutomergeSync = <T>(config: AutomergeSyncConfig<T>) => {
	const [document, setDoc] = createSignal(config.initialDoc)
	const [, rest] = splitProps(config, ["initialDoc"])

	// i think this
	// todo i took this from the react version, but i can probably make it not needed by unsetting
	// todo worth rethinking this whole file more solidly
	// the machine when the config changes
	// necessary to avoid that the same machine context is re-used for different or remounted pages
	// more info here:
	//
	// How to reproduce A:
	// 1. Open a Document a
	// 2. Open a Document b
	// 3. Open Document a again
	// How to reproduce B:
	// 1. Open a Document a
	// 2. During timeout click the Reload button
	//
	// more info: https://github.com/statelyai/xstate/issues/1101
	// related: https://github.com/statelyai/xstate/discussions/1825
	const syncMachine1 = () => createSyncMachine()
	const machine = () =>
		useMachine(syncMachine1(), {
			input: {
				...rest,
				applySnapshot: decryptedSnapshotData => {
					const newDoc: Doc<T> = Automerge.load(decryptedSnapshotData)
					if (newDoc) {
						setDoc(doc => Automerge.merge(doc, newDoc))
					}
				},
				applyChanges: decryptedChanges => {
					const [newDoc] = Automerge.applyChanges(document(), decryptedChanges)
					setDoc(() => newDoc)
				},
				applyEphemeralMessage: decryptedEphemeralMessage => {},
				serializeChanges: (updates: Uint8Array[]) =>
					serializeUint8ArrayUpdates(updates, config.sodium),
				deserializeChanges: (serialized: string) =>
					deserializeUint8ArrayUpdates(serialized, config.sodium),
			},
		})

	const syncDocument = (newDoc: Doc<T>) => {
		const changes = Automerge.getChanges(document(), newDoc)
		setDoc(() => newDoc)
		machine()[1]({type: "ADD_CHANGES", data: changes})
	}

	return [document, syncDocument, machine]
}
