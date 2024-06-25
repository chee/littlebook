import {binary} from "../../../contents/coders.ts"
import UniformType from "../../../contents/uniform-type.ts"
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
			video.controls = true
			this.replaceChildren(video)
		})

		this.addEventListener("change", () => {
			this.blob().then(url => {
				video.src = url
			})
		})
	}
}

class AudioPreview extends PreviewElement<Uint8Array> {
	async blob() {
		const blob = new Blob([this.value])
		const url = URL.createObjectURL(blob)
		return url
	}
	connectedCallback() {
		const audio = document.createElement("audio")
		this.blob().then(url => {
			audio.src = url
			audio.controls = true
			this.replaceChildren(audio)
		})

		this.addEventListener("change", () => {
			this.blob().then(url => {
				audio.src = url
			})
		})
	}
}

export default function image(lb: lb.plugins.API) {
	// todo narrow these to just the types we actually support in these things
	// not midi probably, or some movie types and image types
	lb.registerPreview(UniformType.image, ImagePreview)
	lb.registerPreview(UniformType.movie, VideoPreview)
	lb.registerPreview(UniformType.audio, AudioPreview)
	lb.registerCoder(UniformType.movie, coder)
	lb.registerCoder(UniformType.image, coder)
	lb.registerCoder(UniformType.audio, coder)
}
