import icon from "../../styles/icons/sidebar.svg"
import clsx from "clsx"

export default function SidebarToggle(props: {
	open: () => boolean
	flip?: boolean
	toggle: () => void
}) {
	return (
		<button
			type="button"
			class={clsx("sidebar-toggle", props.flip && "flip")}
			style={{"background-image": `url("${icon}")`}}
			aria-label={
				props.open() ? "hide primary sidebar" : "show primary sidebar"
			}
			aria-pressed={props.open()}
			onclick={props.toggle}
		/>
	)
}
