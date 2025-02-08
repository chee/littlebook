import Icon from "../components/icons/icon.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import repo from "../repo/create.ts"
import type {AutomergeUrl, Doc, DocHandle} from "@automerge/automerge-repo"
import {Button} from "@kobalte/core/button"
import {
	createEffect,
	createMemo,
	createRoot,
	For,
	getOwner,
	Match,
	runWithOwner,
	Show,
	Suspense,
	Switch,
	type Accessor,
} from "solid-js"
import homeURL, {useHome, type Home} from "../repo/home.ts"
import {parseDocumentURL, useDockAPI} from "./dock.tsx"
import type {Entry} from "../documents/entry.ts"
import {createShortcut} from "@solid-primitives/keyboard"
import esbuild from "esbuild-wasm"
import {createStore} from "solid-js/store"
import {Editor, StoredEditor} from "../../../schemas/src/editor.ts"
import {z} from "zod"
import {h} from "../schema-helpers.ts"
import {useEditorRegistry} from "../registries/editor-registry.ts"
import type {DocumentURL} from "./dock-api.ts"
import {useDocument} from "solid-automerge"
import {usePerfectEditor} from "../components/editor/usePerfectEditor.tsx"
import type {Ok} from "true-myth/result"
import {Tooltip} from "@kobalte/core/tooltip"
import OpenWithContextMenu from "./open-with.tsx"

const keynames = {
	CMD: "Meta",
	SUPER: "Meta",
	COMMAND: "Meta",

	ctrl: "Control",
	control: "Control",

	alt: "Alt",
	option: "Alt",

	shift: "Shift",
}

export function createKeybinding(
	keybinding: string,
	action: () => void,
	options: Parameters<typeof createShortcut>[2] = {}
) {
	const keys = keybinding
		.toUpperCase()
		.split("+")
		.map(
			key =>
				keynames[key as keyof typeof keynames] ??
				key.toLocaleLowerCase().replace(/^(.)/, "$1".toUpperCase())
		)
	createShortcut(keys, action, options)
}

const CodeFile = z.object({
	text: z.string(),
	language: z.string().optional(),
	storedURL: h.automergeURL().optional(),
})

type CodeFile = z.infer<typeof CodeFile>

interface FileActionAction {
	type: "action"
	label: string
	keybinding?: string
	when?(opts: {entry: Entry; file: unknown}): boolean
	action(opts: {fileHandle: DocHandle<unknown>}): void
}

interface FileActionSub {
	type: "sub"
	label: string
	when?(opts: {entry: Entry; file: unknown}): boolean
	sub: FileAction[]
}

interface FileActionRadioGroup {
	type: "radio-group"
	value(opts: {file: CodeFile}): string
	choices: {label: string; value: string}[]
	action(opts: {fileHandle: DocHandle<unknown>; value: string}): void
}

type FileAction = FileActionAction | FileActionSub | FileActionRadioGroup

const [fileActions] = createStore<FileAction[]>([
	{
		type: "sub",
		label: "set language",
		when(opts: {entry: Entry; file: unknown}) {
			return opts.entry.contentType == "public.text"
		},
		sub: [
			{
				type: "radio-group",
				choices: [
					{label: "plain", value: ""},
					{label: "javascript", value: "javascript"},
					{label: "python", value: "python"},
					{label: "html", value: "html"},
					{label: "markdown", value: "markdown"},
					{label: "json", value: "json"},
				],
				value(opts: {file: CodeFile}) {
					return opts.file.language ?? ""
				},
				action(opts: {fileHandle: DocHandle<CodeFile>; value: string}) {
					opts.fileHandle.change(file => {
						file.language = opts.value
					})
				},
			},
		],
	},
	{
		type: "action",
		label: "compile to editor",
		when(opts: {entry: Entry; file: unknown}) {
			const code = CodeFile.safeParse(opts.file)
			return (
				code.success &&
				opts.entry.contentType == "public.text" &&
				code.data.language == "javascript"
			)
		},
		action(opts: {fileHandle: DocHandle<CodeFile>}) {
			compileToEditor(opts.fileHandle)
		},
	},
])

export function compileToEditor(fileHandle: DocHandle<CodeFile>) {
	return createRoot(async () => {
		const file = fileHandle.doc()!
		return compile(file.text)
			.then(code => {
				const bytes = new TextEncoder().encode(code)
				const blob = new Blob([bytes], {
					type: "application/javascript",
				})
				const blobURL = URL.createObjectURL(blob)
				return import(/* @vite-ignore */ blobURL).then(mod => ({
					bytes,
					mod,
				}))
			})
			.then(result => {
				const parsed = Editor.safeParse(result.mod)
				if (!parsed.success) {
					throw new Error("document doesn't look like an editor")
				}
				const editor = {...(result.mod as StoredEditor)}
				delete (editor as Partial<Editor>).render
				editor.bytes = result.bytes
				editor.type = "editor"

				if (fileHandle.doc()!.storedURL) {
					return repo
						.find<StoredEditor>(fileHandle.doc()!.storedURL!)
						.then(async handle => {
							handle.change(doc => {
								doc.bytes = editor.bytes
							})
							const homeHandle = await repo.findClassic<Home>(homeURL())
							homeHandle.change(home => {
								if (![...home.editors].includes(handle.url)) {
									home.editors.push(handle.url)
								}
							})
						})
				}

				const url = repo.create(editor).url
				fileHandle.change(file => {
					file.storedURL = url
				})
			})
	})
}

export default function DockTab(props: {url: DocumentURL}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url as DocumentURL))
	const dockAPI = useDockAPI()
	const [entry] = useDocument<Entry>(() => docinfo().url)

	const editor = usePerfectEditor(() => props.url)
	const [home, changeHome] = useHome()
	let tabElement!: HTMLDivElement

	createEffect(() => {
		if (!dockAPI) return
		if (dockAPI.activePanelID == props.url) tabElement.scrollIntoView()
	})

	const [file, fileHandle] = useDocument<unknown>(() => entry()?.url)

	const editorDisplayName = () =>
		editor().isOk
			? (editor() as Ok<Editor, Error>).value.displayName
			: undefined

	const editorID = () =>
		editor().isOk ? (editor() as Ok<Editor, Error>).value.id : undefined

	const owner = getOwner()
	const openDocument = (url: DocumentURL) =>
		runWithOwner(owner, () => dockAPI.openDocument(url))

	return (
		<Suspense>
			<ContextMenu>
				<ContextMenu.Trigger class="dock-tab__context-menu-trigger">
					<div class="dock-tab" ref={tabElement}>
						<div class="dock-tab__icon">
							<Tooltip openDelay={0} closeDelay={0}>
								<Tooltip.Trigger class="dock-tab__editor-icon">
									<Icon
										name={entry()?.icon || "document-text-bold"}
										inline
									/>
								</Tooltip.Trigger>

								<Tooltip.Portal>
									<Tooltip.Content class="dock-tab__editor-tooltip">
										<Tooltip.Arrow />
										{editorDisplayName()}
									</Tooltip.Content>
								</Tooltip.Portal>
							</Tooltip>
						</div>

						<div class="dock-tab__name">{entry()?.name}</div>
						<Button
							class="dock-tab__close"
							aria-label={`close panel ${entry()?.name}`}
							onmousedown={(event: MouseEvent) => {
								event.stopImmediatePropagation()
								event.stopPropagation()
								event.preventDefault()
							}}
							onclick={() => {
								dockAPI.closePanel(props.url)
							}}>
							<Icon name="close-square-linear" inline />
						</Button>
					</div>
				</ContextMenu.Trigger>
				<ContextMenu.Portal>
					<ContextMenu.Content class="pop-menu__content">
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => dockAPI.closePanel(props.url)}>
							close tab
						</ContextMenu.Item>
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => {
								for (const id of dockAPI.panelIDs) {
									if (id != props.url)
										dockAPI.closePanel(id as AutomergeUrl)
								}
							}}>
							close other tabs
						</ContextMenu.Item>
						<ContextMenu.Separator />
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => navigator.clipboard.writeText(props.url)}>
							copy url
						</ContextMenu.Item>
						<ContextMenu.Separator />
						<Show when={!home()?.files.includes(docinfo().url)}>
							<ContextMenu.Item
								class="pop-menu__item"
								onSelect={() => {
									// eslint-disable-next-line solid/reactivity
									changeHome(home => {
										if (!home.files.includes(docinfo().url)) {
											home.files.push(docinfo().url)
										}
									})
								}}>
								add to sidebar
							</ContextMenu.Item>
						</Show>
						<OpenWithContextMenu
							url={props.url}
							currentEditorID={editorID()}
							openDocument={url => openDocument(url)}
						/>
						<Show when={entry() && file()}>
							<DataDrivenContextMenu
								items={fileActions}
								entry={entry as Accessor<Entry>}
								file={file as Accessor<Doc<unknown>>}
								fileHandle={fileHandle()!}
							/>
						</Show>
					</ContextMenu.Content>
				</ContextMenu.Portal>
			</ContextMenu>
		</Suspense>
	) as HTMLElement
}

export function DataDrivenContextMenu(props: {
	items: typeof fileActions
	entry: Accessor<Entry>
	file: Accessor<Doc<unknown>>
	fileHandle: DocHandle<unknown>
}) {
	const when = (fn?: (opts: {entry: Entry; file: Doc<unknown>}) => boolean) =>
		fn ? fn({entry: props.entry(), file: props.file()}) : true

	return (
		<For each={props.items}>
			{fileAction => (
				<Switch>
					<Match
						when={fileAction.type == "action" && when(fileAction.when)}>
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() =>
								(fileAction as FileActionAction).action!({
									fileHandle: props.fileHandle,
								})
							}>
							{(fileAction as FileActionAction).label}
						</ContextMenu.Item>
					</Match>

					<Match when={fileAction.type == "sub" && when(fileAction.when)}>
						<ContextMenu.Sub overlap gutter={-10}>
							<ContextMenu.SubTrigger class="pop-menu__sub-trigger">
								{(fileAction as FileActionSub).label}

								<div class="pop-menu__item-right-slot">
									<Icon name="alt-arrow-right-linear" />
								</div>
							</ContextMenu.SubTrigger>

							<ContextMenu.Portal>
								<ContextMenu.SubContent class="pop-menu__content pop-menu__sub-content">
									<DataDrivenContextMenu
										items={(fileAction as FileActionSub).sub}
										entry={props.entry}
										file={props.file}
										fileHandle={props.fileHandle}
									/>
								</ContextMenu.SubContent>
							</ContextMenu.Portal>
						</ContextMenu.Sub>
					</Match>

					<Match when={fileAction.type == "radio-group"}>
						<ContextMenu.RadioGroup
							value={(fileAction as FileActionRadioGroup).value({
								file: props.file() as CodeFile,
							})}
							onChange={value =>
								(fileAction as FileActionRadioGroup).action!({
									fileHandle: props.fileHandle,
									value,
								})
							}>
							<For each={(fileAction as FileActionRadioGroup).choices}>
								{choice => (
									<ContextMenu.RadioItem
										value={choice.value}
										class="pop-menu__radio-item">
										<ContextMenu.ItemIndicator class="pop-menu__item-indicator">
											<Icon name="check-square-bold" />
										</ContextMenu.ItemIndicator>
										{choice.label}
									</ContextMenu.RadioItem>
								)}
							</For>
						</ContextMenu.RadioGroup>
					</Match>
				</Switch>
			)}
		</For>
	)
}

const wasm = await import("esbuild-wasm/esbuild.wasm?url")

await esbuild.initialize({
	wasmURL: wasm.default,
})

async function compile(text: string) {
	const result = await esbuild.transform(text, {
		loader: "ts",
		target: "esnext",
	})
	return result.code
}
