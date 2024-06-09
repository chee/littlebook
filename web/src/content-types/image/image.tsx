import {updateText} from "@automerge/automerge-repo"
import type {ContentView} from "../content-type-registry.ts"
import {useMemo} from "preact/hooks"
import * as coders from "../coders.ts"
import type {LittlebookAPI} from "../../api/api.ts"

const type = "public.image" as lb.UniformTypeIdentifier
const coder = coders.binary()
type ImageModel = Uint8Array

// todo also ReadOnly content view ?
const ImageContentView: ContentView<ImageModel> = ({content}) => {
	const blob = useMemo(
		() => URL.createObjectURL(new Blob([content.value])),
		[content.value, content],
	)

	return <img src={blob} alt="" />
}

export function activate(lb: LittlebookAPI) {
	lb.coders.register(type, coder)
	// todo should i shrink this to just be websafe images?
	lb.views.content.register([type], ImageContentView)
}

export function deactivate(lb: LittlebookAPI) {
	lb.coders.remove(type, coder)
	lb.views.content.remove(ImageContentView)
}
