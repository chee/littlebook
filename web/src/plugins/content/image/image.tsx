import {binary} from "../../../contents/coders.ts"
import {UniformType} from "../../../contents/uniform-type.ts"
import {PreviewElement} from "../../../contents/content-view.ts"

class ImagePreview extends PreviewElement<Uint8Array> {
	async blob() {
		const blob = new Blob([this.value])
		const url = URL.createObjectURL(blob)
		return url
	}
	connectedCallback() {
		const img = document.createElement("img")
		this.blob().then(url => {
			img.src = url
			this.replaceChildren(img)
		})

		this.addEventListener("change", () => {
			this.blob().then(url => {
				img.src = url
			})
		})
	}
}

const coder = binary()

class VideoPreview extends PreviewElement<Uint8Array> {
	async blob() {
		const blob = new Blob([this.value])
		const url = URL.createObjectURL(blob)
		return url
	}
	connectedCallback() {
		const video = document.createElement("video")
		this.blob().then(url => {
			video.src = url
			this.replaceChildren(video)
		})

		this.addEventListener("change", () => {
			this.blob().then(url => {
				video.src = url
			})
		})
	}
}

export default function image(lb: lb.plugins.API) {
	lb.registerPreview(UniformType.image, ImagePreview)
	lb.registerPreview(UniformType.movie, VideoPreview)
	lb.registerCoder(UniformType.movie, coder)
	lb.registerCoder(UniformType.image, coder)
}
