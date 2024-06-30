import {makePersisted} from "@solid-primitives/storage"
import {createRoot} from "solid-js"
import {createStore} from "solid-js/store"

export type LocalAutomergeState = {
	home?: lb.SpaceId
}

const [state, set] = createRoot(() =>
	makePersisted(createStore<LocalAutomergeState>({}), {
		name: "littlebook",
	}),
)

export {state, set}

export const useLocalAuthState = () => {
	return state
}
