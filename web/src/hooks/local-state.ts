import {useLocalStorage} from "@uidotdev/usehooks"

export const useLocalState = () => {
	const initialState: lb.LocalState = {}
	const [local, setLocal] = useLocalStorage<lb.LocalState>(
		"littlebook",
		initialState,
	)
	const updateLocalState = (s: lb.LocalState) => setLocal({...local, ...s})
	const signOut = () => setLocal(initialState)

	return {
		...local,
		updateLocalState,
		signOut,
	}
}
