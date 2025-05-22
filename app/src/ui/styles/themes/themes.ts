import {makePersisted} from "@solid-primitives/storage"
import {createEffect} from "solid-js"
import {createRoot} from "solid-js"
import {createSignal} from "solid-js"

const [theme, setTheme] = makePersisted(createSignal(""), {
	name: "nextaction:theme",
})

const query = new URLSearchParams(self.location.search)

if (query.has("theme")) {
	setTheme(query.get("theme")!)
	query.delete("theme")
}

createRoot(() =>
	createEffect(
		() =>
			theme && self.document.documentElement.setAttribute("theme", theme()),
	),
)
