import {createMutable} from "solid-js/store"
import type {AutomergeURL} from "../../core/sync/url.ts"
import debug from ":/core/debug.ts"
const log = debug.extend("commands")
export type CommandURL = AutomergeURL & {type: "command"}

export interface CommandHistoryEntry {
	undo?(): void
	redo?(): void
}

export interface Command<T> {
	type: "command"
	id: string
	displayName: string
	category: string
	execute(payload: T): Promise<CommandHistoryEntry> | CommandHistoryEntry
}

const history = createMutable<CommandHistoryEntry[]>([])
const future = createMutable<CommandHistoryEntry[]>([])
let lastEntryTime = Date.now()
const COMBINE_THRESHOLD = 500

export function createCommand<Payload = void>(
	cmd: Command<Payload>,
): Command<Payload> {
	return cmd
}

export function useCanUndo() {
	const canUndo = () => history.length > 0
	const canRedo = () => future.length > 0
	return [canUndo, canRedo]
}

// todo rename this to make it clear that it combines recent entries
export function pushHistoryEntry(entry: CommandHistoryEntry) {
	if (history.length > 0 && Date.now() - lastEntryTime < COMBINE_THRESHOLD) {
		const lastEntry = history[history.length - 1]
		const combinedUndo = () => {
			if (entry.undo) entry.undo()
			if (lastEntry.undo) lastEntry.undo()
		}
		const combinedRedo = () => {
			if (lastEntry.redo) lastEntry.redo()
			if (entry.redo) entry.redo()
		}
		history[history.length - 1] = {
			undo: combinedUndo,
			redo: combinedRedo,
		}
	} else {
		history.push(entry)
	}
	lastEntryTime = Date.now()
}

export async function executeCommand<Payload>(
	cmd: Command<Payload>,
	payload?: Payload,
) {
	let entry = cmd.execute(payload!)
	if (entry instanceof Promise) {
		entry = await entry
	}
	history.push(entry)
	future.splice(0, future.length)
}

export function undo() {
	const entry = history.pop()
	if (!entry || !entry.undo) return
	entry.undo()
	future.push(entry)
}

export function redo() {
	const entry = future.pop()
	if (!entry || !entry.redo) return
	entry.redo()
	history.push(entry)
}
