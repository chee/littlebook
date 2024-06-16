import {useMediaQuery} from "@uidotdev/usehooks"
export const getStyle = (
	property: string,
	element = document.documentElement,
) => getComputedStyle(element).getPropertyValue("--littlebook-" + property)
export const getBreakpoint = (bp: string, el = document.documentElement) => {
	return getStyle("breakpoint-" + bp, el)
}
type breakpoints = "s" | "m" | "l" | "xl"

export default function useMinWidth(breakpoint: breakpoints) {
	return useMediaQuery(`(min-width: ${getBreakpoint(breakpoint)})`)
}

export function useMaxWidth(breakpoint: breakpoints) {
	return useMediaQuery(`(max-width: ${getBreakpoint(breakpoint)})`)
}
