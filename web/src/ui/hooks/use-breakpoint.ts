import {useMediaQuery} from "@uidotdev/usehooks"
import tw from "../../../tailwind.config.ts" // Your tailwind config
import fully from "tailwindcss/resolveConfig.js"
const fullconfig = fully(tw)
const breakpoints = fullconfig.theme.screens

export function useMinWidth(px: number) {
	return useMediaQuery(`(min-width: ${px}px)`)
}

export default function useNamedBreakpoint(
	breakpoint: keyof typeof breakpoints,
) {
	return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`)
}
