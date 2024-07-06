import {
	children as resolveChildren,
	onCleanup,
	type ParentComponent,
	splitProps,
	createEffect,
} from "solid-js"
import split, {type Options, type Instance} from "split.js"
export type {Instance as SplitInstance}

type GutterClickFn = (
	index: number,
	direction: "horizontal" | "vertical",
	event: MouseEvent,
) => void

const Split: ParentComponent<
	{
		withInstance?(instance: Instance): void
		onGutterClick?: GutterClickFn | (GutterClickFn | undefined)[]
	} & Options
> = props => {
	const children = resolveChildren(() => props.children)

	createEffect(() => {
		const [_, splitJSOptions] = splitProps(props, ["children", "ongutterclick"])
		const destruction: (() => void)[] = []
		const instance = split(children() as HTMLElement[], {
			...splitJSOptions,
			gutter(index: number, direction: "horizontal" | "vertical") {
				const gutter = document.createElement("div")
				gutter.classList.add("gutter")
				gutter.classList.add(`gutter-${direction}`)
				const ongutterclick = _.onGutterClick
				const ogc =
					typeof ongutterclick == "function"
						? ongutterclick
						: ongutterclick?.[index]

				if (ogc) {
					const handle = (event: MouseEvent) => {
						ogc(index, direction, event)
					}
					gutter.addEventListener("click", handle)
					destruction.push(() => gutter.removeEventListener("click", handle))
				}
				return gutter
			},
		})
		props.withInstance?.(instance)
		onCleanup(() => {
			for (const destroy of destruction) destroy()
			instance.destroy()
		})
	})

	return children()
}

// todo split-grid
//https://split.js.org/#/split-grid?rows=2&columns=3

export default Split
