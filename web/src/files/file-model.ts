// todo mixin
import NamedDocument from "../documents/named-document-model.ts"

export default class File extends NamedDocument<lb.File> {
	get when() {
		return this.doc.when
	}

	set when(when) {
		this.change(file => {
			file.when = when
		})
	}

	// todo this will be different probably because note is a rich-text
	get note() {
		return this.doc.note
	}

	set note(note) {
		this.change(file => {
			file.note = note
		})
	}

	get contentId() {
		return this.doc.content
	}
}
