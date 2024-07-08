export default async function (mod: string) {
	const pkg = await import(`${mod}/package.json`, {with: {type: "json"}})
	console.log(pkg)
}
