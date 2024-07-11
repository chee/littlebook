#!/usr/bin/env node
/// <reference types="../../web/src/global.d.ts"/>

import fs from "node:fs/promises"
import {createReadStream, createWriteStream} from "node:fs"
import {create as tar} from "tar"
import os from "node:os"
import path from "node:path"
import {chdir} from "node:process"

let pkgJson = await fs.readFile("./package.json", "utf-8").catch(error => {
	console.error(error)
	process.stdout.write("\n\n\n")
	console.error("couldn't read ./package.json. are you in the right folder?")
	process.exit(2)
})

/**
 * @typedef {object} PackageJSON
 * @prop {lb.plugins.Manifest} [littlebook]
 * @prop {string} [main]
 * @prop {string} [browser]
 * @prop {string} [name]
 * @prop {string} [description]
 */

let pkg =
	pkgJson &&
	(() => {
		try {
			return /** @type {PackageJSON} */ (JSON.parse(pkgJson))
		} catch {}
	})()

if (!pkg) {
	console.error("nothing found in the package.json")
	process.exit(3)
}

let manifest = pkg.littlebook

if (!manifest) {
	console.error("no `littlebook` manifest in the package.json")
	process.exit(4)
}

let root = os.tmpdir()
let cwd = process.cwd()

chdir(root)

let lbj = JSON.stringify(
	{
		...manifest,
		name: pkg.name,
		description: pkg.description,
	},
	null,
	"\t"
)
let manifestPath = "lb.json"
let bundlePath = "bundle.js"
let promise = fs.writeFile(manifestPath, lbj, "utf-8")

let file = `./${pkg.name
	?.replace("@littlebook/", "")
	.replace(/[/]/g, ".")}.lbplugin`
createReadStream(path.join(cwd, pkg.browser || pkg.main || "./index.js"))
	.pipe(createWriteStream(bundlePath))
	.addListener("finish", async () => {
		await promise
		tar(
			{
				gzip: true,
				file,
			},
			[manifestPath, bundlePath]
		).then(() => {
			fs.rename(file, path.join(cwd, file))
			console.info(`done: ${file}`)
			process.exit(0)
		})
	})
