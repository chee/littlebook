import createCoder from "./coder.ts"
import view from "./view.tsx"
import pkg from "./package.json" with {type: "json"}

const config = pkg.littlebook

const activate: lb.plugins.activate = (lb: lb.plugins.API) => {
	const [tldrawType] = config.contentTypes
	const coder = createCoder(lb)
	const type = lb.UniformType.get(tldrawType.identifier)
	const disposers = [lb.registerContentCoder(type, coder)]

	const tag = config.editors[0].element
	if (!customElements.get(tag)) {
		customElements.define(tag, view)
	}

	return () => {
		for (const fn of disposers) {
			fn()
		}
	}
}

export default activate
