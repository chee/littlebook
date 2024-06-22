import {
	type ContentChangeHelpers,
	createContentChangeHelpers,
	createContentViewHelpers,
	type ContentViewHelpers,
} from "./content-helpers.ts"
import type {Doc} from "@automerge/automerge-repo"
import useDocument from "../documents/use-document.ts"
import type {ContentChangeFn} from "../../contents/views/content-view.ts"

type UseContentValueReturn<T extends lb.Content<lb.AnyContent>> = [
	() => Doc<T>["value"] | undefined,
	(change: ContentChangeFn<T["value"]>) => void,
	() => ContentViewHelpers<T["value"]> | undefined,
]

export default function useContentValue<T extends lb.Content<any>>(
	id: () => T["id"] | undefined,
): UseContentValueReturn<T> {
	const [content, changeContent] = useDocument<T>(id)

	// todo todo should probably rewrite createContentHelpers to return a fun so
	// i don't need to recreate it on every changeContentDocument
	function changeContentValue(
		change: (
			change: T["value"],
			helpers: ContentChangeHelpers<T["value"]>,
		) => void,
	) {
		changeContent(doc => {
			change(doc.value, createContentChangeHelpers(doc))
		})
	}

	return [
		() => content.latest?.value,
		changeContentValue,
		() => content.latest && createContentViewHelpers(content.latest),
	]
}
