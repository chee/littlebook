import {parse} from "@babel/parser"
import traverse from "@babel/traverse"

export default function walkImports(
	source: string,
	callback: (pathValue: string, nodeType: "import" | "export") => void
) {
	const ast = parse(source, {
		sourceType: "module",
		plugins: ["typescript", "jsx", "decorators-legacy", "classProperties"],
	})

	traverse(ast, {
		ImportDeclaration(path) {
			const val = path.node.source.value
			callback(val, "import")
		},
		ExportNamedDeclaration(path) {
			if (path.node.source) {
				const val = path.node.source.value
				callback(val, "export")
			}
		},
		ExportAllDeclaration(path) {
			const val = path.node.source.value
			callback(val, "export")
		},
	})
}
