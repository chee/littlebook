import {createSignal} from "solid-js"

export default function createBoolean(
	initialState = false,
): [() => boolean, () => void, (boolean: boolean) => void] {
	let [signal, setSignal] = createSignal(initialState)
	return [
		signal,
		() => setSignal(val => !val),
		(boolean: boolean) => setSignal(boolean),
	]
}
