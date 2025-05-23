import {defineAction} from "solid-command-palette"
// todo:
/*
1. create file
2. open a standalone view
3. import file
4. dockview navigation
5. file nav
6, search through all indexed stuff
*/

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
