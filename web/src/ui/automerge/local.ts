import {makePersisted} from "@solid-primitives/storage"
import {createMemo, createRoot} from "solid-js"
import {createStore} from "solid-js/store"

const [state, set] = createRoot(() =>
	makePersisted(createStore<lb.LocalAutomergeState>({}), {
		name: "littlebook",
	}),
)

export const canLoad = createRoot(() =>
	createMemo(() => state.device && state.user && state.homeShareId),
)

export {state, set}

export const useLocalAuthState = () => {
	return state
}
