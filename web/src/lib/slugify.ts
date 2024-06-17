export function slugify(string: string) {
	return string.replace(/[^0-9A-Za-z_.~-]+/g, "-")
}
