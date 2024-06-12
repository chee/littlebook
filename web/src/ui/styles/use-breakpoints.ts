import {useMediaQuery} from "@uidotdev/usehooks"
export const getStyle = (
	property: string,
	element = document.documentElement,
) => getComputedStyle(element).getPropertyValue("--" + property)

function withoutPx(string: string) {
	return string.replace(/px$/, "")
}

const breakpoints = {
	small: withoutPx(getStyle("breakpoint-small")),
	medium: withoutPx(getStyle("breakpoint-medium")),
	large: withoutPx(getStyle("breakpoint-large")),
	huge: withoutPx(getStyle("breakpoint-huge")),
	massive: withoutPx(getStyle("breakpoint-massive")),
}

export default function useViewportAtLeast(
	breakpoint: keyof typeof breakpoints,
) {
	return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`)
}

export function useViewportAtMost(breakpoint: keyof typeof breakpoints) {
	return useMediaQuery(`(max-width: ${breakpoints[breakpoint]})`)
}
