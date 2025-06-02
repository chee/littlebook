export function setIcon(doc: {icon?: string}, icon: string) {
	const single = [...new Intl.Segmenter().segment(icon)]?.[0]?.segment
	doc.icon = single ?? " "
}
