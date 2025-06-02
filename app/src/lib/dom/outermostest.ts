export default function outermostest(
	element: Element,
	query: string,
): Element | null {
	let outermost = null
	let cur: Element | null = element

	while (cur instanceof Element) {
		cur = cur.closest(query)
		if (cur) {
			outermost = cur
		}
	}

	return outermost
}
