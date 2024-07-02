import {createBreakpoints} from "@solid-primitives/media"

export const getStyle = (
	property: string,
	element = document.documentElement,
) => getComputedStyle(element).getPropertyValue("--littlebook-" + property)

export const getBreakpoint = (bp: string, el = document.documentElement) => {
	return getStyle("breakpoint-" + bp, el)
}

export default createBreakpoints({
	s: getBreakpoint("s"),
	m: getBreakpoint("m"),
	l: getBreakpoint("l"),
	xl: getBreakpoint("xl"),
})
