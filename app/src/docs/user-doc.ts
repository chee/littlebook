import type {AutomergeURL} from ":/core/sync/url.ts"
import {createFileEntry, type FileEntryURL} from "./file-entry-doc.ts"
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
	plugins: Record<AutomergeURL, boolean>
}

export function createUserDoc(
	user: Partial<UserDoc> & {home: AreaURL},
): UserDoc {
	return {
		name: "new",
		type: "user",
		areas: [],
		associations: {},
		plugins: {},
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

export function pin(url: AutomergeURL, doc: UserDoc): void {
	if (!doc.areas.includes(url as unknown as AreaURL)) {
		doc.areas.push(url as unknown as AreaURL)
	}
}
