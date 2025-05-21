import type {AutomergeValue} from "@automerge/automerge"

// export type * from ":/plugins/plugin-api.ts"
// export type * from ":/docs/file-entry-doc"
// export type * from ":/domain/file/file-menu.ts"
// export type * from ":/domain/user/user.ts"
// export type * from ":/plugins/base/base-sinks.ts"
// export type * from ":/plugins/base/base-sources.ts"
// export type * from ":/plugins/base/base-views.ts"
// export type * from ":/plugins/base/base-plugin.ts"

export type AutomergeMapValue = {
	[key: string]: AutomergeValue
}

export type MaybePromise<T> = T | Promise<T>

export type ConceptName =
	| "user"
	| "area"
	| "plugin"
	| "entry"
	| "content"
	| "command"
	| "source"
	| "view"
