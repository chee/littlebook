import type {AutomergeURL} from ":/core/sync/url.ts"
import type {CommandURL} from ":/domain/command/command.ts"
import {createFileEntry, type FileEntryURL} from "./file-entry-doc.ts"
import type {PluginURL} from ":/domain/plugin/plugin.ts"
import type {SourceURL} from ":/domain/source/source.ts"
import type {ViewURL} from ":/domain/view/view.ts"
import {createArea, type AreaURL} from ":/docs/area-doc.ts"
import {curl} from ":/core/sync/automerge.ts"

export type UserURL = AutomergeURL & {type: "user"}

export interface UserDoc {
	type: "user"
	name: string
	picture?: Uint8Array
	home: AreaURL
	areas: AreaURL[]
	associations: Record<FileEntryURL, string>

	commands: CommandURL[]
	sources: SourceURL[]
	plugins: PluginURL[]
	views: ViewURL[]
}

export function createUserDoc(
	user: Partial<UserDoc> & {home: AreaURL},
): UserDoc {
	return {
		name: "new",
		type: "user",
		areas: [],
		associations: {},
		commands: [],
		sources: [],
		plugins: [],
		views: [],
		...user,
	}
}

export function createUser(user?: Partial<UserDoc>): UserURL {
	return curl(
		createUserDoc({
			home:
				user?.home ??
				createArea({
					files: [
						createFileEntry({
							name: "my manifesto.txt",
							content: {text: "hello world"},
						}),
					],
				}),
			...user,
		}),
	)
}

export function isUserDoc(doc: unknown): doc is UserDoc {
	return (doc as UserDoc)?.type === "user"
}
