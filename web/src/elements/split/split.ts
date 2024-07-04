import {
	children as resolveChildren,
	onCleanup,
	type ParentComponent,
	splitProps,
	createEffect,
} from "solid-js"
import split, {type Options, type Instance} from "split.js"
export type {Instance as SplitInstance}

const Split: ParentComponent<
	{
		withInstance?(instance: Instance): void
	} & Options
> = props => {
	const children = resolveChildren(() => props.children)

	createEffect(() => {
		const [_, splitJSOptions] = splitProps(props, ["children"])
		const instance = split(children() as HTMLElement[], splitJSOptions)
		props.withInstance?.(instance)
		onCleanup(() => instance.destroy())
	})

	return children()
}

// todo split-grid
//https://split.js.org/#/split-grid?rows=2&columns=3

export default Split
