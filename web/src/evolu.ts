import {createEvolu} from "@evolu/common-web"
import {Schema} from "@effect/schema"
import {
	NonEmptyString1000,
	SqliteBoolean,
	cast,
	database,
	id,
	table,
	String as EvoluString,
} from "@evolu/common"

export const When = Schema.Union(
	EvoluString.pipe(Schema.length(10)),
	EvoluString.pipe(Schema.brand("someday")),
)
export type When = typeof When.Type

export const IconString = EvoluString.pipe(
	Schema.minLength(1),
	Schema.maxLength(1),
	Schema.brand("IconString"),
)
export type IconString = typeof IconString.Type

export const NameString = NonEmptyString1000
export type NameString = typeof NameString.Type

const ProjectId = id("Project")
type ProjectId = typeof ProjectId.Type
const ProjectTable = table({
	id: ProjectId,
	name: NameString,
	when: Schema.NullOr(When),
})
type ProjectTable = typeof ProjectTable.Type

export const Database = database({
	projects: ProjectTable,
})
export type Database = typeof Database.Type

const evolu = createEvolu(Database, {
	syncUrl: "http://localhost:11124",
})
export default evolu

export const queries = {
	all: {
		projects: evolu.createQuery(db =>
			db
				.selectFrom("projects")
				.selectAll()
				// SQLite doesn't support the boolean type, but we have `cast` helper.
				.where("isDeleted", "is not", cast(true))
				.orderBy("createdAt"),
		),
	},
}

evolu.subscribeOwner(() => {
	console.log(evolu.getOwner())
})
