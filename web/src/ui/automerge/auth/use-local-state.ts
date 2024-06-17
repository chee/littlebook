// import {useLocalStorage} from "@uidotdev/usehooks"
import {makePersisted} from "@solid-primitives/storage"
import {createStore} from "solid-js/store"

export const useLocalState = () => {
	return makePersisted(createStore<lb.LocalState>({}), {
		name: "littlebook",
	})
}
