import {EditorViewElement} from "../../../contents/content-view.ts"

export class UnknownContent extends EditorViewElement<any> {
	#file?: lb.File
	connectedCallback() {}

	set file(file: lb.File) {
		this.#file = file
		this.render()
	}

	render() {
		this.innerHTML = /*html*/ `
			<ul class="has-white-background p-4">
				<li>
					file name: <code>${this.#file?.name}</code>
				</li>
				<li>
					file id: <code>${this.#file?.id}</code>
				</li>
				<li>
					content-type: <code>${this.#file?.contentType}</code>
				</li>
				<li>
					content-id: <code>${this.#file?.content}</code>
				</li>
				<li>
					last-modified: <code>${this.#file?.lastModified}</code>
				</li>
			</ul>
		`
	}
}

export default UnknownContent
