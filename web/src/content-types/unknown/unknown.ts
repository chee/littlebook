import type {LittlebookAPI} from "../../api/api.ts"
import UnknownView from "./unknown-view.tsx"
import * as coders from "../coders.ts"

export const types = []

const type = "content.data" as lb.UniformTypeIdentifier

const coder = coders.binary()

export function activate(lb: LittlebookAPI) {
	lb.coders.register<Uint8Array>(type, coder)
	lb.views.content.register([type], UnknownView)
}

export function deactivate(lb: LittlebookAPI) {
	lb.coders.remove(type, coder)
	lb.views.content.remove(UnknownView)
}
