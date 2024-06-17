import {makePersisted} from "@solid-primitives/storage"
import {createMemo} from "solid-js"
import {createStore} from "solid-js/store"

const [state, set] = makePersisted(createStore<lb.LocalAutomergeState>({}), {
	name: "littlebook",
})

export const canLoad = createMemo(
	() => state.device && state.user && state.homeShareId,
)

export {state, set}

export const useLocalAuthState = () => {
	return state
}
