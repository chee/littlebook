import registries, {
	type ContentViewName,
} from "../contents/types/type-registries"
import {slugify} from "../lib/slugify"

type ViewName = "content" | "metadata" | "preview"

function createCustomElementName<T extends lb.ContentView<any>>(
	contentType: lb.UniformTypeIdentifier,
	viewName: ViewName,
) {
	return (slugify(contentType) + "-" + viewName) as ContentViewName<T>
}

// todo register a destructor at this moment.
export function registerContentType<T extends lb.AnyContent>(
	config: lb.plugins.ContentType<T>,
) {
	const contentType = config.type
	const isPlainType = typeof contentType == "string"
	const typename = isPlainType ? contentType : contentType.name
	registries.coders.register(typename, config.coder)
	for (const viewName of ["content", "metadata", "preview"] as const) {
		const view = config.views[viewName]
		if (view) {
			registries.views[viewName].register(
				[typename],
				createCustomElementName(typename, viewName),
			)
		}
	}
	if (!isPlainType) {
		registries.contentTypes.register(contentType)
	}
}
