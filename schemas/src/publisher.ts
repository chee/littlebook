import {DocHandle} from "@automerge/automerge-repo"
import {Entry} from "./entry.js"
import {
	object,
	type InferOutput,
	function as fn,
	pipe,
	args,
	tuple,
	returns,
	promise,
	instance,
	record,
	string,
	unknown,
	optional,
	picklist,
	union,
	array,
	literal,
} from "valibot"
import {stored} from "./util.js"

export const PublisherMetadata = object({
	id: string(),
	displayName: string(),
	contentTypes: union([array(string()), literal("*")]),
	category: optional(picklist(["export"])),
})

export const Publisher = object({
	publish: pipe(
		fn(),
		args(
			tuple([
				object({
					handle: instance(DocHandle),
					entry: Entry,
					options: optional(record(string(), unknown())),
				}),
			])
		),
		returns(pipe(promise()))
	),
	...PublisherMetadata.entries,
})

export type Publisher = InferOutput<typeof Publisher>

export const StoredPublisher = stored("publisher", PublisherMetadata.entries)

export type StoredPublisher = InferOutput<typeof StoredPublisher>
