import createCoder from "./coder.ts"
import view from "./view.tsx"
import pkg from "./package.json" with {type: "json"}
const config = pkg.littlebook

export default function activate(lb: lb.plugins.API) {
	const [excaliType] = config.contentTypes
	const coder = createCoder(lb)
	const type = lb.UniformType.get(excaliType.identifier)
	const disposers = [lb.registerContentCoder(type, coder)]
	const tag = config.contentViews[0].identifier
	if (!customElements.get(tag)) {
		customElements.define(tag, view)
	}

	return () => {
		for (const fn of disposers) {
			fn()
		}
	}
}
