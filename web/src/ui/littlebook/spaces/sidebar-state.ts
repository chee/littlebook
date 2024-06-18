import {createRoot, createSignal} from "solid-js"

export const [primaryOpen, setPrimaryOpen] = createRoot(() =>
	createSignal(false),
)
export const [secondaryOpen, setSecondaryOpen] = createRoot(() =>
	createSignal(false),
)
