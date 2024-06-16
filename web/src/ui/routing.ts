export function slugify(string: string) {
	return string.replace(/[^0-9A-Za-z_.~-]+/g, "-")
}

export function slug(string: string) {
	return slugify(string).slice(0, 32) || "untitled"
}
