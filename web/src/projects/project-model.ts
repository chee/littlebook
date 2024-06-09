import NamedDocument from "../documents/named-document-model.ts"

export default class Project extends NamedDocument<lb.Project> {
	get items() {
		return this.doc?.items
	}

	get when() {
		return this.doc.when
	}

	set when(when) {
		this.change(project => {
			project.when = when
		})
	}

	addItem(id: lb.Project["items"][number]) {
		this.change(project => {
			project.items.push(id)
		})
	}

	removeItem(id: lb.Project["items"][number]) {
		this.change(project => {
			const index = project.items.indexOf(id)
			project.items.deleteAt(index)
		})
	}
}
