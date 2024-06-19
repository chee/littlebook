import {createRoot, createSignal} from "solid-js"

export default createRoot(() => createSignal<HTMLInputElement | null>(null))
