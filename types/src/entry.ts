import type {AutomergeURL} from "./document.js"

export interface Entry {
	/**
	 * an entry that describes and points to a file
	 */
	type: "entry"
	/** the file's name */
	name: string
	/**  a solar icon name or a URL or a dataURI or an automerge url to bytes doc */
	icon?: string
	/* ref to file content */
	url: AutomergeURL
}
