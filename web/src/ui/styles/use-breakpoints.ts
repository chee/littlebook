import {useMediaQuery} from "@uidotdev/usehooks"
export const getStyle = (
	property: string,
	element = document.documentElement,
) => getComputedStyle(element).getPropertyValue("--littlebook-" + property)
export const getBreakpoint = (bp: string, el= document.documentElement) => {
	return getStyle("breakpoint-" + bp, el)
}
function withoutPx(string: string) {
	return string.replace(/px$/, "")
}

const breakpoints = {
	s: getBreakpoint("s"),
	m: getBreakpoint("m"),
	l: getBreakpoint("l"),
	xl: getBreakpoint("xl"),
	"2xl": getBreakpoint("2xl")
}

export default function useMinWidth(
	breakpoint: keyof typeof breakpoints,
) {
	return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`)
}

export function useMaxWidth(breakpoint: keyof typeof breakpoints) {
	return useMediaQuery(`(max-width: ${breakpoints[breakpoint]})`)
}
