import SQLite from "better-sqlite3"
import bodyParser from "body-parser"
import cors from "cors"
import * as Cause from "effect/Cause"
import * as Effect from "effect/Effect"
import * as Either from "effect/Either"
import * as Exit from "effect/Exit"
import {flow} from "effect/Function"
import * as Match from "effect/Match"
import express from "express"
import {Kysely, SqliteDialect} from "kysely"
import path from "node:path"
import {Server, ServerLive, Db} from "@evolu/server"

const createDb = fileName =>
	new Kysely({
		dialect: new SqliteDialect({
			database: new SQLite(path.join(process.cwd(), "/", fileName)),
		}),
	})

const createExpressApp = Effect.gen(function* (adapt) {
	const server = yield* adapt(
		Server.pipe(
			Effect.provide(ServerLive),
			Effect.provideService(Db, createDb("db.sqlite")),
		),
	)

	yield* adapt(server.initDatabase)

	const app = /** @type {any} */ (express())
	/**
	 * @type {cors.CorsOptions}
	 */
	const corsopts = {
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		credentials: true,
	}

	app.use(cors(corsopts))
	app.options("*", cors(corsopts))
	app.use(bodyParser.raw({limit: "20mb", type: "application/x-protobuf"}))

	app.post("/", (req, res) => {
		Effect.runCallback(server.sync(/** @type {Uint8Array} */ (req.body)), {
			onExit: Exit.match({
				onFailure: flow(
					Cause.failureOrCause,
					Either.match({
						onLeft: flow(
							Match.value,
							Match.tagsExhaustive({
								BadRequestError: ({error}) => {
									res.status(400).send(JSON.stringify(error))
								},
							}),
						),
						onRight: error => {
							// eslint-disable-next-line no-console
							console.log(error)
							res.status(500)
						},
					}),
				),
				onSuccess: buffer => {
					res.setHeader("Content-Type", "application/x-protobuf")
					res.send(buffer)
				},
			}),
		})
	})

	return app
})
;(await Effect.runPromise(createExpressApp)).listen(11124)
