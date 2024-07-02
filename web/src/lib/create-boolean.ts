import {createSignal} from "solid-js"

export default function createBoolean(
	initialState = false,
): [() => boolean, () => void, (boolean: boolean) => void] {
	const [signal, setSignal] = createSignal(initialState)
	return [
		signal,
		() => setSignal(val => !val),
		(boolean: boolean) => setSignal(boolean),
	]
}
