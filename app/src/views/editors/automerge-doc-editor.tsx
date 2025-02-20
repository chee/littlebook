import type {Editor} from "@pointplace/types"
import {createDocumentProjection} from "solid-automerge"
import {
	For,
	getOwner,
	mapArray,
	Match,
	onCleanup,
	runWithOwner,
	Switch,
} from "solid-js"
import "./automerge-doc-editor.css"
import {updateText, type DocHandle} from "@automerge/automerge-repo"
import {createStore, reconcile} from "solid-js/store"
import {createSolidTable, getCoreRowModel} from "@tanstack/solid-table"
import {any, record, string} from "valibot"

function StringEditor(props: {value: string; change: (value: string) => void}) {
	return (
		<textarea
			value={props.value}
			oninput={event => props.change(event.currentTarget.value)}
		/>
	) as HTMLElement
}
function AutomergeEditor(props: {
	json: object
	handle: DocHandle<object>
	path: (string | number)[]
}) {
	const [entries, updateEntries] = createStore(
		mapArray(
			() => Object.entries(props.json),
			item => ({key: item[0], value: item[1]})
		)()
	)
	const table = createSolidTable({
		columns: [{accessorKey: "key"}, {accessorKey: "value"}],
		get data() {
			return entries
		},
		getCoreRowModel: getCoreRowModel(),
	})

	const owner = getOwner()
	props.handle.on("change", function lol() {
		updateEntries(
			reconcile(
				Object.entries(props.json).map(([key, value]) => ({key, value}))
			)
		)
		runWithOwner(owner, () => {
			onCleanup(() => {
				props.handle.off("change", lol)
			})
		})
	})

	return (
		<table class="automerge-editor">
			<For each={entries}>
				{entry => {
					const key = () => entry.key
					const value = () => entry.value
					const type = () =>
						Array.isArray(value())
							? "array"
							: value() == null
								? "null"
								: value() instanceof Uint8Array
									? "uint8array"
									: typeof value()

					return (
						<tr
							class={`automerge-editor__row automerge-editor__row--${type()}`}>
							<td class="automerge-editor__key">{key()}</td>
							<td class="automerge-editor__value">
								<Switch>
									<Match when={type() == "object"}>
										<AutomergeEditor
											json={value()}
											handle={props.handle}
											path={props.path.concat(key())}
										/>
									</Match>
									<Match when={type() == "number"}>
										<input type="number" value={value()} />
									</Match>
									<Match when={type() == "string"}>
										<StringEditor
											value={value()}
											change={value => {
												props.handle.change(doc => {
													const path = props.path?.concat(
														key()
													) ?? [key]
													updateText(doc, path, value)
												})
											}}
										/>
									</Match>
									<Match when={type() == "boolean"}>
										<input type="checkbox" checked={value()} />
									</Match>
									<Match when={Array.isArray(value())}>
										<AutomergeEditor
											json={value()}
											handle={props.handle}
											path={props.path.concat(key())}
										/>
									</Match>
									<Match when={type() == "uint8array"}>
										uint8array
									</Match>
								</Switch>
							</td>
						</tr>
					)
				}}
			</For>
		</table>
	) as HTMLElement
}

const AutomergeDocEditor = {
	category: "editor",
	displayName: "automerge doc editor",
	id: "automerge-doc-editor",
	schema: record(string(), any()),
	render(props) {
		const doc = createDocumentProjection(() => props.handle)
		return (
			<AutomergeEditor json={doc()!} handle={props.handle} path={[]} />
		) as HTMLElement
	},
} satisfies Editor<object>
export default AutomergeDocEditor
