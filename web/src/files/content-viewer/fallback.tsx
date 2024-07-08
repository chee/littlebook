import {ContentViewElement} from "../contents/content-view.ts"

export class UnknownContent extends ContentViewElement<any> {
	#file?: lb.File
	constructor() {
		super()
		const style = document.createElement("style")
		style.textContent = /*css*/ `
			background: var(--content-color-fill);
			color: var(--content-color-line);
			padding: var(--space-4);
		`
	}
	connectedCallback() {}

	set file(file: lb.File) {
		this.#file = file
		this.render()
	}

	render() {
		this.innerHTML = /*html*/ `
			<ul>
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
