import type {ViewStylesType} from "@littlebook/plugin-api/types/view.ts"

export default function resolveStyles(
	styles: ViewStylesType | ViewStylesType[],
): string | Promise<string> {
	if (typeof styles == "string") {
		return styles
	}

	if (styles instanceof Promise) {
		return styles.then(styles => {
			if (typeof styles == "string") {
				return styles
			} else if (
				styles &&
				typeof styles == "object" &&
				"default" in styles
			) {
				return styles.default
			}
			console.warn(
				"Unexpected styles type. must be string, or module. got: ",
				styles,
			)
			return ""
		})
	}

	if (Array.isArray(styles)) {
		return Promise.all(styles.map(resolveStyles)).then(resolvedStyles =>
			resolvedStyles.join("\n"),
		)
	}
	return ""
}

/*
import type {ViewStylesType} from "@littlebook/plugin-api/types/view.ts"

export default function resolveStyles(
	styles: ViewStylesType | ViewStylesType[],
): string[] | Promise<string[]> {
	if (typeof styles == "string") {
		return [styles]
	}

	if (styles instanceof Promise) {
		return styles.then(styles => {
			if (typeof styles == "string") {
				return [styles]
			} else if (
				styles &&
				typeof styles == "object" &&
				"default" in styles
			) {
				return [styles.default]
			}
			console.warn(
				"Unexpected styles type. must be string[], or module[]. got: ",
				styles,
			)
			return []
		})
	}

	if (Array.isArray(styles)) {
		return Promise.all(styles.map(resolveStyles)).then(resolvedStyles =>
			resolvedStyles.flat(),
		)
	}
	return []
}
 */
