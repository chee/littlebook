import {defineAction} from "solid-command-palette"

const minimalAction = defineAction({
	id: "minimal",
	title: "Minimal Action",
	run: () => {
		console.log("ran minimal action")
	},
})

export const actions = {
	[minimalAction.id]: minimalAction,
}
