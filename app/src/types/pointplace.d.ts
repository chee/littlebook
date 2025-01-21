import {AutomergeUrl} from "@automerge/automerge-repo"
import {OpenCanvas} from "./ocif"

declare global {
	namespace pointplace {
		type FileURL = AutomergeUrl & {ref: "file"}
		// todo work on name
		type SourcerURL = AutomergeUrl & {ref: "sourcer"}
		// todo work on name
		type SinkerURL = AutomergeUrl & {ref: "sinker"}
		type TreeviewerURL = AutomergeUrl & {ref: "treeviewer"}
		type TabviewerURL = AutomergeUrl & {ref: "tabviewer"}
		// this is a link to a doc with a `.bytes` that can be imported to get
		// an esm module exporting default the shape lb.editor.Editor
		type EditorURL = AutomergeUrl & {ref: "editor"}
		type ViewerURL = AutomergeUrl & {ref: "viewer"}

		/**
		 * an entry that describes and points to a file
		 */
		interface Entry {
			type: "entry"
			// the file's name
			name: string
			// the file's contentType
			contentType: string
			// additional content types interfaces this file presents
			// e.g. {contentType: "gfm", conformsTo: ["markdown", "text"]}
			// todo should this be something the _type_ knows about instead
			// i.e. should a type be a URL to a type, which is a description
			// in automerge? could even come with a schema attached to
			// it and
			conformsTo?: string[]
			// the tool that created the file this is a link to a doc with a
			// `.bytes` that can be imported to get an esm module exporting
			// default the shape lb.sourcer todo improve name
			sourcer?: SourcerURL
			// a ref to the file herself
			file: FileURL
		}

		namespace editor {
			type ref = EditorURL
			type Props<T> = {
				handle: DocHandle<T>
				cleanup(fn: () => void): void
				setName(name: string): void
			}
			interface Editor {
				// the special type "*" indicates it's a general editor for all
				// kinds of content
				contentTypes: string[] | "*"

				// making this DocHandle<unknown> because the editor code should
				// check that the fileType conforms
				render(props: Props<unknown>)
			}
		}

		namespace sourcer {
			type ref = SourcerURL

			interface Bytes {
				type: "sourcer"
				sourcerType: "bytes"
				fileExtensions: string[]
				mimeTypes: string[]
				contentType: string
				create(opts: Omit<Entry, "file"> & {bytes: Uint8Array}): Entry
			}

			interface New {
				type: "sourcer"
				sourcerType: "new"
				contentType: string
				create(opts: Omit<Entry, "file">): Entry
			}
		}

		namespace file {
			type ref = FileURL
			interface Raw {
				bytes: Uint8Array
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
