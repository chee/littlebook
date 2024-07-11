import {createBreakpoints} from "@solid-primitives/media"

export let getStyle = (property: string, element = document.documentElement) =>
	getComputedStyle(element).getPropertyValue("--" + property)

export let getBreakpoint = (bp: string, el = document.documentElement) => {
	return getStyle("breakpoint-" + bp, el)
}

export default createBreakpoints({
	s: getBreakpoint("s"),
	m: getBreakpoint("m"),
	l: getBreakpoint("l"),
	xl: getBreakpoint("xl"),
})
