import type {DeviceWithSecrets, UserWithSecrets} from "@localfirst/auth"
import type {ShareId} from "@localfirst/auth-provider-automerge-repo"
import {makePersisted} from "@solid-primitives/storage"
import {createRoot} from "solid-js"
import {createStore} from "solid-js/store"

export type LocalAutomergeState = {
	device?: DeviceWithSecrets
	user?: UserWithSecrets
	home?: ShareId
}

const [state, set] = createRoot(() =>
	makePersisted(createStore<LocalAutomergeState>({}), {
		name: "littlebook",
	}),
)

export const canStartFromLocal = createRoot(
	() => () => Boolean(state.device && state.user && state.home),
)

export {state, set}

export const useLocalAuthState = () => {
	return state
}
