import clsx from "clsx"

function CuteSidebarIcon({
	open,
	flip: flipped,
}: {open: () => boolean; flip: boolean}) {
	return (
		<svg
			height="32"
			viewBox="0 0 67 47"
			class={clsx({
				"rotate-180": flipped,
			})}>
			<title>toggle</title>
			<g stroke-linecap="round">
				<path
					fill="white"
					d="M16.75 10c9.03-1.64 21.02-.05 33.5 0 4.71-2.22 6.73.58 6.75 6.75 1.9 4.16.07 9.16 0 13.5 2.8 8-5.25 6.66-6.75 6.75-7.64.09-23.36.46-33.5 0-7.47-1.76-4.49-2.1-6.75-6.75 1.78-5.46 1.4-8.74 0-13.5-1.78-2.99 5.82-5.68 6.75-6.75"
				/>
				<path
					fill="none"
					stroke="var(--color-paper-600)"
					stroke-width="2"
					d="M16.75 10c10.45 1.68 21.95.02 33.5 0m-33.5 0c11.02-.48 21.77.73 33.5 0m0 0c2.59 1.23 5.79.78 6.75 6.75M50.25 10c5.81 1.12 8.27 1.3 6.75 6.75m0 0c-.91 4.61-.8 9.95 0 13.5m0-13.5c.1 4.81-.53 9.62 0 13.5m0 0c1.71 6.1-.97 8.5-6.75 6.75M57 30.25c2.01 5.01-4.17 6.35-6.75 6.75m0 0c-15.34.45-24.81-1.77-33.5 0m33.5 0c-11.9-.12-23.1.24-33.5 0m0 0c-4.97 1.77-8.74-3.17-6.75-6.75M16.75 37c-5.1 1.38-8.5-.62-6.75-6.75m0 0c-.67-3.2.48-5.54 0-13.5m0 13.5c-.01-3.11.58-5.27 0-13.5m0 0C8.77 13.28 10.88 8 16.75 10M10 16.75c-.45-4.22.67-8.7 6.75-6.75"
				/>
			</g>
			<g stroke-linecap="round">
				<path
					style={{fill: open() ? "var(--color-paper-600)" : "white"}}
					d="M14.75 10.33h7.5c2.5 0 3.75 1.25 3.75 3.75v17.5c0 2.5-1.25 3.75-3.75 3.75h-7.5c-2.5 0-3.75-1.25-3.75-3.75v-17.5c0-2.5 1.25-3.75 3.75-3.75"
				/>
				<path
					fill="none"
					stroke="var(--color-paper-600)"
					stroke-width="2"
					d="M14.75 10.33h7.5m-7.5 0h7.5m0 0c2.5 0 3.75 1.25 3.75 3.75m-3.75-3.75c2.5 0 3.75 1.25 3.75 3.75m0 0v17.5m0-17.5v17.5m0 0c0 2.5-1.25 3.75-3.75 3.75M26 31.58c0 2.5-1.25 3.75-3.75 3.75m0 0h-7.5m7.5 0h-7.5m0 0c-2.5 0-3.75-1.25-3.75-3.75m3.75 3.75c-2.5 0-3.75-1.25-3.75-3.75m0 0v-17.5m0 17.5v-17.5m0 0c0-2.5 1.25-3.75 3.75-3.75M11 14.08c0-2.5 1.25-3.75 3.75-3.75"
				/>
			</g>
			<path
				fill="none"
				style={{stroke: open() ? "white" : "var(--color-paper-600)"}}
				stroke-linecap="round"
				stroke-width="2"
				d="M15.66 17.3c1.19.02 6.26-.1 7.47-.15m-7.91-.1c1.14.1 6.46.5 7.7.55m-6.79 4.55c1.2-.05 5.95-.2 7.1-.16m-7.46-.15c1.15-.02 5.8.51 7.14.51m-7.1 5.75c1.16.06 5.97.38 7.15.44m-6.55.25c1.25-.05 6-.6 7.2-.74"
			/>
		</svg>
	)
}

export default function SidebarToggle(props: {
	open: () => boolean
	flip?: boolean
	toggle: () => void
}) {
	return (
		<button
			type="button"
			class="sidebar-toggle"
			aria-label={
				props.open() ? "hide projects sidebar" : "show projects sidebar"
			}
			aria-pressed={props.open()}
			onclick={props.toggle}>
			<CuteSidebarIcon open={props.open} flip={Boolean(props.flip)} />
		</button>
	)
}
