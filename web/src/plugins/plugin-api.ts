import registries, {
	type ContentViewName,
} from "../contents/types/type-registries"
// import {placeholders} from "../contents/views/content-view.ts"

// todo register a destructor at this moment.
export function registerContentType<T extends lb.AnyContent>(
	config: lb.plugins.ContentType<T>,
) {
	const contentType = config.type
	const isPlainType = typeof contentType == "string"
	const typename = isPlainType ? contentType : contentType.name
	registries.coders.register(typename, config.coder)
	for (const viewName of ["editor", /*"metadata",*/ "preview"] as const) {
		const view = config.views[viewName]
		const customElementName = (typename + "." + viewName).replaceAll(
			".",
			"-",
		) as ContentViewName<any>
		if (view) {
			registries.views[viewName].register([typename], customElementName)

			if ("define" in view) {
				view.define(customElementName)
			} else {
				customElements.define(customElementName, view)
			}
		}
	}
	if (!isPlainType) {
		registries.contentTypes.register(contentType)
	}
}
