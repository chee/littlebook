import {updateText} from "@automerge/automerge/next"
import useDocument from "../../../documents/use-document.ts"
import {Suspense} from "solid-js"

export default function Notes(props: {itemId(): lb.ItemId | undefined}) {
	let [doc, change] = useDocument<lb.Item>(props.itemId)
	let textarea = (
		<textarea
			oninput={() => {
				change(doc => {
					updateText(doc, ["note"], textarea.value)
				})
			}}>
			{doc.latest?.note}
		</textarea>
	) as HTMLTextAreaElement
	return <Suspense>{textarea}</Suspense>
}
