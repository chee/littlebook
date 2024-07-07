import ContentEditor from "../content-editor.tsx"
import ContentPreview from "../content-preview.tsx"
import useDocument from "../../documents/use-document.ts"
import {
	createEffect,
	createSignal,
	For,
	Match,
	on,
	onMount,
	Suspense,
	Switch,
	type JSXElement,
} from "solid-js"
import {editorViewRegistry, previewRegistry} from "../content-view.ts"
import "./file-area.scss"

import type {DocHandleEphemeralMessagePayload} from "@automerge/automerge-repo"
import {Set as set} from "immutable"

type FileAreaProps = {
	fileId?: lb.FileId
	headerItems?: {
		left?: JSXElement
		right?: JSXElement
	}
}
export default function FileArea(props: FileAreaProps) {
	const [file, _change, handle] = useDocument<lb.File>(() => props.fileId)

	const hasEditorView = () =>
		Boolean(file.latest && editorViewRegistry.getFirst(file.latest.contentType))

	const hasPreview = () =>
		Boolean(file.latest && previewRegistry.getFirst(file.latest.contentType))

	const [friends, setFriends] = createSignal(set<string>())
	function addFriend(name: string) {
		setFriends(friends().add(name))
	}

	function removeFriend(name: string) {
		setFriends(friends().delete(name))
	}

	function updateFriends(payload: DocHandleEphemeralMessagePayload<lb.File>) {
		const {message, senderId} = payload
		if (message == "hello") {
			addFriend(senderId)
		} else if (message == "goodbye") {
			removeFriend(senderId)
		}
	}

	createEffect(
		on([handle], ([prevHandle]) => {
			if (prevHandle != handle()) {
				prevHandle?.removeListener("ephemeral-message", updateFriends)
				handle()?.on("ephemeral-message", updateFriends)
			}
			onMount(() => {
				handle()?.on("ephemeral-message", updateFriends)
			})
		}),
	)

	createEffect(() => {
		console.log(friends())
	})

	return (
		<Suspense>
			<div class="file-viewer">
				<header class="file-viewer-head headstrip">
					<div class="file-viewer-head-left headstrip-left">
						{props.headerItems?.left}
					</div>
					<div class="file-viewer-head-middle headstrip-middle">
						<div class="file-viewer-head-file-name">
							<span class="file-viewer-head-file-icon">
								{file.latest?.icon}
							</span>
							<span class="file-viewer-head-file-name__name">
								{file.latest?.name}
							</span>
						</div>
					</div>
					<div class="file-viewer-head-right headstrip-right">
						<div class="friends">
							<For each={friends().toArray()}>
								{name => <span>{name}</span>}
							</For>
						</div>

						{props.headerItems?.right}
					</div>
				</header>
				<div class="file-viewer-body" style={{width: "100%"}}>
					<Switch>
						<Match when={file.latest && (hasEditorView() || !hasPreview())}>
							<ContentEditor fileId={file.latest!.id} />
						</Match>
						<Match when={hasPreview()}>
							<ContentPreview fileId={file.latest!.id} />
						</Match>
					</Switch>
				</div>
			</div>
		</Suspense>
	)
}
