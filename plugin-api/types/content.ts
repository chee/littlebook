export type ContentShape = {[key: string]: ContentValue}

export type ContentValue =
	| ContentScalar
	| Array<ContentValue>
	| {[key: string]: ContentValue}

// todo i guess i'm disallowing the use of Counter or ImmutableString by doing
// this
// i've vaguely decided that automerge-specific types shouldn't be part of
// @littlebook's public API, though i guess the repo is haha
export type ContentScalar = string | number | boolean | null | Date | Uint8Array
