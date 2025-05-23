import type {OCIFCore04} from "@/types/v0.4.ts"
import type {CreateSource} from "@littlebook/plugin-api/types/source.ts"

export const createOpenCanvas04: CreateSource<OCIFCore04> = {
	id: "opencanvas-0.4",
	category: "new",
	displayName: "OpenCanvas (v0.4)",
	new() {
		// todo make this not be an array? dumb?
		// can be like:
		// return {content: {whatever}, name: "whatever"}
		// i.e. it should return an _entry_, not a content
		// todo i should make an ocif builder
		return [
			{
				ocif: "https://canvasprotocol.org/ocif/v0.4",
				nodes: [
					{
						id: "n1",
						position: [100, 100],
						size: [50, 50],
						resource: "r1",
						data: [
							{
								type: "@ocif/circle",
								radius: 50,
							},
						],
					},
				],
				resources: [
					{
						id: "r1",
						representations: [
							{
								"mime-type": "text/plain",
								content: "Hello, World!",
							},
						],
					},
				],
				relations: [],
				schemas: [
					{
						uri: "https://spec.canvasprotocol.org/node/circle/0.2",
						name: "@ocif/circle",
						schema: {
							properties: {
								radius: {type: "integer"},
							},
							required: ["radius"],
						},
					},
				],
			},
		]
	},
}
