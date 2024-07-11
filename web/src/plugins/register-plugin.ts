export default async function (mod: string) {
	let pkg = await import(`${mod}/package.json`, {with: {type: "json"}})
	console.log(pkg)
}
