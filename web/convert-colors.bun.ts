import {parseArgs} from "util"

import twc from "./tailwind.config.ts"

if (Bun.argv[2] == "css") {
	const colors = twc.theme.colors
	for (const name in colors) {
		if (typeof colors[name] == "string") {
			console.log(`--littlebook-${name}: ${colors[name]};`)
		} else {
			for (const sub in colors[name]) {
				const main = colors[name]
				const subc = main[sub]
				console.log(`--littlebook-${name}-${sub}: ${subc};`)
			}
		}
	}
} else {
	const colors = twc.theme.colors
	for (const name in colors) {
		if (typeof colors[name] == "string") {
			colors[name] = `rgb(var(--littlebook-${name}) / <alpha-value>)`
		} else {
			for (const sub in colors[name]) {
				const main = colors[name]
				const subc = main[sub]

				colors[name][sub] =
					`rgb(var(--littlebook-${name}-${sub}) / <alpha-value>)`
			}
		}
	}
	console.log(JSON.stringify(twc))
}
