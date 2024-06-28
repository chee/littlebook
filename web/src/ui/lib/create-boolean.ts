import {createSignal} from "solid-js"

export default function createBoolean(initialState = false) {
	const [signal, setSignal] = createSignal(initialState)
	return [
		signal,
		(forcedValue?: boolean) =>
			setSignal(val => (forcedValue == null ? !val : forcedValue)),
	]
}
