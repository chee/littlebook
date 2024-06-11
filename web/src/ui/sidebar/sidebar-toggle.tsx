import {VscLayoutSidebarLeft, VscLayoutSidebarLeftOff} from "react-icons/vsc"
import clsx from "clsx"
export default function SidebarToggle({
	toggle,
	isCollapsed,
	light = false,
	white = false,
}: {
	toggle: () => void
	isCollapsed: boolean
	light?: boolean
	white?: boolean
}) {
	return (
		<button
			type="button"
			class={clsx("button", light && "is-light", white && "is-white")}
			onClick={toggle}
			label={isCollapsed ? "show sidebar" : "hide sidebar"}>
			<span class="icon">
				<VscLayoutSidebarLeft size={30} />
			</span>
		</button>
	)
}
