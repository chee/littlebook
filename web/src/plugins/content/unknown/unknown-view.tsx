export class UnknownContent extends HTMLElement {
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
					content-type: <code>${this.#content?.contentType}</code>
				</li>
				<li>
					content-id: <code>${this.#content?.id}</code>
				</li>
				<li>
					last-modified: <code>${this.#file?.lastModified}</code>
				</li>
			</ul>
		`
	}
}

export default UnknownContent
