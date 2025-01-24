import {AutomergeUrl, type ChangeFn} from "@automerge/automerge-repo"
import {OpenCanvas} from "./ocif"

declare global {
	namespace pointplace {
		type EntryURL = AutomergeUrl & {ref: "entry"}
		type FileURL = AutomergeUrl & {ref: "file"}

		type ImporterURL = AutomergeUrl & {ref: "importer"}
		type PublisherURL = AutomergeUrl & {ref: "publisher"}
		type TreeviewerURL = AutomergeUrl & {ref: "treeviewer"}
		type TabviewerURL = AutomergeUrl & {ref: "tabviewer"}
		// this is a link to a doc with a `.bytes` that can be imported to get
		// an esm module exporting default the shape lb.editor.Editor
		type EditorURL = AutomergeUrl & {ref: "editor"}
		type ViewerURL = AutomergeUrl & {ref: "viewer"}

		namespace editor {
			type ref = EditorURL
			type Props<T> = {
				handle: DocHandle<T>
				cleanup(fn: () => void): void
				setName(name: string): void
				shadow: ShadowRoot
			}

			interface Manifest {
				type: "editor"
				id: string
				name: string
				// the special type "*" indicates it's a general editor for all
				// kinds of content
				contentTypes: string[] | "*"
				bytes: Uint8Array
			}

			interface Editor {
				id: string
				// the special type "*" indicates it's a general editor for all
				// kinds of content
				contentTypes: string[] | "*"

				// making this DocHandle<unknown> because the editor code should
				// check that the fileType conforms
				render(props: Props<unknown>)
			}
		}

		namespace importer {
			type ref = ImporterURL

			interface Importer {
				id: string
				displayName: string
				filePatterns?: string[] | "*"
				mimeTypes?: string[] | "*"
				contentType: string
				import(
					opts: Omit<Entry, "file" | "contentType"> & {bytes: Uint8Array}
				): Entry
			}

			interface Creator {
				id: string
				displayName: string
				contentType: string
				new (opts: Omit<Entry, "file">): Entry
			}

			// is this good? it can go to a URL and download stuff?
			// like an RSS feed importer thing?
			interface Fetcher {
				id: string
				displayName: string
				contentType: string
				urlPatterns: string[] | "*"
				import(opts: Omit<Entry, "file"> & {bytes: Uint8Array}): Entry
			}
		}

		namespace file {
			type ref = FileURL
			interface Raw {
				bytes: Uint8Array
			}

			interface Folder {
				files: EntryURL
			}

			interface Text {
				text: string
			}

			interface RichText {
				text: string
			}

			interface Sound {
				channels: Uint8Array[]
			}

			type canvas = OpenCanvas
		}
	}
}
