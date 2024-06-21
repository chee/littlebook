import createContentHelpers, {type ContentHelpers} from "./content-helpers.ts"
import type {ChangeFn, Doc} from "@automerge/automerge-repo"
import useDocument from "../documents/use-document.ts"

type UseContentValueReturn<T extends lb.Content<lb.AnyContent>> = [
	() => Doc<T>["value"] | undefined,
	(change: ChangeFn<T["value"]>, helpers: ContentHelpers<T["value"]>) => void,
]

export default function useContentValue<T extends lb.Content<any>>(
	id: () => T["id"] | undefined,
): UseContentValueReturn<T> {
	const [content, changeContent] = useDocument<T>(id)

	// todo todo should probably rewrite createContentHelpers to return a fun so
	// i don't need to recreate it on every changeContentDocument
	function changeContentValue(
		change: (change: T["value"], helpers: ContentHelpers<T["value"]>) => void,
	) {
		changeContent(doc => {
			change(doc.value, createContentHelpers(doc))
		})
	}

	return [() => content.latest?.value, changeContentValue]
}
