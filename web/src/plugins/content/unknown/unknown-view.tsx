import {
	EditorViewElement,
	type EditorViewProps,
} from "../../../contents/views/content-view.ts"

export class UnknownContent extends EditorViewElement<any> {
	static displayName: "mystery meat"
	static tag: "unknown"
	#file?: lb.File
	#content?: lb.Content<any>
	connectedCallback() {
		console.log("im conntencted")
	}

	set file(file: lb.File) {
		this.#file = file
		this.render()
	}

	set content(content: lb.Content<lb.AnyContent>) {
		this.#content = content
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
