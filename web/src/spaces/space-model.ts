import NamedDocument from "../documents/named-document-model.ts"

export class Space extends NamedDocument<lb.Space> {
	get areas() {
		return this.doc.areas
	}

	get projects() {
		return this.doc.projects
	}

	addArea(id: lb.Space["areas"][number]) {
		this.change(space => {
			space.areas.push(id)
		})
	}
	removeArea(id: lb.Space["areas"][number]) {
		this.change(space => {
			const index = space.areas.indexOf(id)
			space.areas.deleteAt(index)
		})
	}

	addProject(id: lb.Space["projects"][number]) {
		this.change(space => {
			space.projects.push(id)
		})
	}
	removeProject(id: lb.Space["projects"][number]) {
		this.change(space => {
			const index = space.projects.indexOf(id)
			space.projects.deleteAt(index)
		})
	}
}
