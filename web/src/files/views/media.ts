import {
	ContentViewElement,
	contentViewRegistry,
} from "../contents/content-view.ts"
import UniformType from "../contents/uniform-type.ts"

class ImagePreview extends ContentViewElement<Uint8Array> {
	async blob() {
		let blob = new Blob([this.content.value])
		let url = URL.createObjectURL(blob)
		return url
	}
	connectedCallback() {
		let img = document.createElement("img")
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
		let blob = new Blob([this.content.value])
		let url = URL.createObjectURL(blob)
		return url
	}
	connectedCallback() {
		let video = document.createElement("video")
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
		let blob = new Blob([this.content.value])
		let url = URL.createObjectURL(blob)
		return url
	}
	connectedCallback() {
		let audio = document.createElement("audio")
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
	customElements.get("image-preview") ||
		customElements.define("image-preview", ImagePreview)
	customElements.get("video-preview") ||
		customElements.define("video-preview", VideoPreview)
	customElements.get("audio-preview") ||
		customElements.define("audio-preview", AudioPreview)
	contentViewRegistry.addPreview({
		displayName: "Image",
		element: "image-preview",
		contentTypes: [UniformType.image.identifier],
	})
	contentViewRegistry.addPreview({
		displayName: "Movie",
		element: "video-preview",
		contentTypes: [UniformType.video.identifier, UniformType.movie.identifier],
	})
	contentViewRegistry.addPreview({
		displayName: "Sound",
		element: "audio-preview",
		contentTypes: [UniformType.audio.identifier],
	})
}
