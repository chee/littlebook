export function slugify(string: string) {
	return string.replace(/[^0-9A-Za-z_.~-]+/g, "-")
}

export const project = (project: lb.Project, file?: lb.File) =>
	`/projects/${slugify(project.name)}/${project.id}${file?.id ? `?file=${file.id}` : ""}`

export const file = (file: lb.File) => `/files/${slugify(file.name)}/${file.id}`

export const route = {
	project(project: lb.Project) {
		return `/projects/*/${project.id}`
	},
}
