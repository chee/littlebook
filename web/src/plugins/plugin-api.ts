import registries from "../contents/types/type-registries"

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
			registries.views[viewName].register([typename], view)
		}
	}
	if (!isPlainType) {
		registries.contentTypes.register(contentType)
	}
}
