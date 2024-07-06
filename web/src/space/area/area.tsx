import type {JSX} from "solid-js/jsx-runtime"

export type AreaProps = {
	children: JSX.Element
	header: JSX.Element
}

export default function Area(props: AreaProps) {
	return (
		<div class="area">
			<header class="area-header">{props.header}</header>
			<div class="area-inner">{props.children}</div>
		</div>
	)
}
