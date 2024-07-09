import {
	ContentViewElement,
	contentViewRegistry,
} from "../contents/content-view.ts"
import UniformType from "../contents/uniform-type.ts"

class ImagePreview extends ContentViewElement<Uint8Array> {
	async blob() {
		const blob = new Blob([this.content.value])
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

class VideoPreview extends ContentViewElement<Uint8Array> {
	async blob() {
		const blob = new Blob([this.content.value])
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

class AudioPreview extends ContentViewElement<Uint8Array> {
	async blob() {
		const blob = new Blob([this.content.value])
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

export default function register() {
	customElements.define("image-preview", ImagePreview)
	customElements.define("video-preview", VideoPreview)
	customElements.define("audio-preview", AudioPreview)
	contentViewRegistry.register(UniformType.image, "image-preview")
	contentViewRegistry.register(UniformType.video, "video-preview")
	contentViewRegistry.register(UniformType.movie, "video-preview")
	contentViewRegistry.register(UniformType.audio, "audio-preview")
}
