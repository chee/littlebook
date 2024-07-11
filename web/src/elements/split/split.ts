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

let Split: ParentComponent<
	{
		withInstance?(instance: Instance): void
		onGutterClick?: GutterClickFn | (GutterClickFn | undefined)[]
	} & Options
> = props => {
	let children = resolveChildren(() => props.children)

	createEffect(() => {
		let [_, splitJSOptions] = splitProps(props, ["children", "onGutterClick"])
		let destruction: (() => void)[] = []
		let instance = split(children.toArray() as HTMLElement[], {
			...splitJSOptions,
			gutter(index: number, direction: "horizontal" | "vertical") {
				let gutter = document.createElement("div")
				gutter.classList.add("gutter")
				gutter.classList.add(`gutter-${direction}`)
				let ongutterclick = _.onGutterClick
				let ogc =
					typeof ongutterclick == "function"
						? ongutterclick
						: ongutterclick?.[index]

				if (ogc) {
					let handle = (event: MouseEvent) => {
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
			for (let destroy of destruction) destroy()
			instance.destroy()
		})
	})

	return children()
}

export default Split
