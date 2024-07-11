import {makePersisted} from "@solid-primitives/storage"
import {createRoot} from "solid-js"
import {createStore} from "solid-js/store"

export type LocalAutomergeState = {
	home?: lb.SpaceId
}

let [state, set] = createRoot(() =>
	makePersisted(createStore<LocalAutomergeState>({}), {
		name: "littlebook",
	}),
)

export {state, set}

export let useLocalAuthState = () => {
	return state
}
