import {zipSync, unzipSync, type Unzipped} from "fflate"
import epubjs from "epubjs"
import UniformType, {} from "../../web/src/contents/uniform-type.ts"
import {PreviewElement} from "../../web/src/contents/content-view.ts"
import type {lb} from "../../web/src/types.ts"

class EPUBPreview extends PreviewElement<Uint8Array> {
	static displayName = "book reader"
	connectedCallback() {
		const blob = new Blob([this.value])
		const url = URL.createObjectURL(blob)
		const book = epubjs(this.value.buffer, {
			// openAs: "binary",
			replacements: "none",
			encoding: "utf-8",
		})

		const render = book.renderTo(this, {
			manager: "default",
			height: "400px",
			width: "1024px",
		})
		render.display()
	}
}

export default function epub(lb: lb.plugins.API) {
	lb.registerPreview(UniformType.epub, EPUBPreview)
	lb.registerCoder<Uint8Array>(UniformType.epub, {
		encode(bytes: Uint8Array) {
			return bytes
			console.log(bytes)
			return zipSync(bytes)
		},
		decode(bytes) {
			return bytes
			const unzipped = unzipSync(bytes)
			console.log(unzipped)
			return unzipped
		},
	})
}
