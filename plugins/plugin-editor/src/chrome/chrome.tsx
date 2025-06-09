/// <reference types="../../../../app/node_modules/vite/client" />

import type {AutomergeFileEditorAPI} from "@littlebook/plugin-api/types/view.ts"
import type {
	LittlebookFileTree,
	LittlebookPluginShape,
} from "../shapes/shapes.ts"
import {makeDocumentProjection} from "solid-automerge"
import {
	createContext,
	createEffect,
	createSignal,
	For,
	Show,
	useContext,
	type JSX,
} from "solid-js"
import {ReactiveSet} from "@solid-primitives/set"
import type {Prop} from "@automerge/vanillajs"
import createTypescriptEditor from "../editors/ts/ts-editor.tsx"
import createJSONEditor from "../editors/json/json-editor.tsx"
import createStyleEditor from "../editors/css/css-editor.tsx"
import {createBaseEditor} from "../editors/base/base-editor.tsx"
import type {WorkerShape} from "@valtown/codemirror-ts/worker"
import bemby from "@chee/bemby"
import type {PluginEditorWorker} from "../worker/worker.ts"
import Resizable from "@corvu/resizable"
import {
	eq,
	getProperty,
	setProperty,
	type LBPSrcFilePath,
} from "../util/path.ts"
import {makePersisted} from "@solid-primitives/storage"
import {Collapsible} from "@kobalte/core/collapsible"
import {ContextMenu} from "@kobalte/core/context-menu"

import type {
	BaseEventPayload,
	DropTargetLocalizedData,
	ElementDragType,
} from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types"
import type {ChangeFn} from "@automerge/automerge"

function getTypescriptPath(path: Prop[]): LBPSrcFilePath {
	return ["src", ...path] as LBPSrcFilePath
}

interface FileTreeContext {
	isSelected(path: Prop[]): boolean
	addSelected(path: Prop[]): void
	select(path: Prop[]): void
	isRenaming(path?: Prop[]): boolean
	cancelRename(): void
	startRename(path: Prop[]): void
	renaming(): Prop[] | null
	move(from: Prop[], to: Prop[]): void
	rename(newName: string | null): void
	"new"(path: Prop[], kind: "file" | "folder"): void
	rm(path: Prop[]): void
	getContextMenuOptions(path: Prop[]): string[]
	selectContextMenuOption(path: Prop[], option: string): void
	getURL(path: Prop[]): string
}

const FileTreeContext = createContext<FileTreeContext>()

export function useFileTreeContext(): FileTreeContext {
	const context = useContext(FileTreeContext)
	if (!context) {
		throw new Error(
			"useFileTreeContext must be used within a FileTreeProvider"
		)
	}
	return context
}

export function createFileTreeContext(opts: {
	change(fn: ChangeFn<LittlebookFileTree>): void
	src(): LittlebookFileTree
	path(): Prop[]
	setPath(path: Prop[]): void
	getURL(path: Prop[]): string
}): FileTreeContext {
	const selected = new ReactiveSet<Prop[]>([opts.path()])
	const [renaming, setRenaming] = createSignal<Prop[] | null>(null)
	createEffect(() => {
		if (selected.size == 1) {
			const path = selected.values().next().value
			if (!path) return
			if (typeof getProperty(opts.src(), path) == "string") {
				opts.setPath(selected.values().next().value!)
			}
		}
	})

	return {
		isSelected(path: Prop[]) {
			return selected.has(path)
		},
		addSelected(path: Prop[]) {
			selected.add(path)
		},
		select(path: Prop[]) {
			selected.clear()
			selected.add(path)
		},
		move(path: Prop[], newPath: Prop[]) {
			const src = opts.src()
			const source = getProperty(src, path)
			const target = getProperty(src, newPath)

			if (typeof target == "string" || !target) {
				opts.change(src => {
					try {
						setProperty(src, path, undefined)
						setProperty(
							src,
							newPath,
							typeof source == "string" ? source : {...source}
						)
					} catch {}
				})
			} else if (typeof target == "object") {
				const content = getProperty(src, path)
				if (content) {
					opts.change(src => {
						try {
							setProperty(src, path, undefined)
							setProperty(
								src,
								newPath.concat(path[path.length - 1]),
								typeof content == "string" ? content : {...content}
							)
						} catch {}
					})
				}
			}
		},
		rm(path: Prop[]) {
			setProperty(opts.src(), path, undefined)
		},
		new(path: Prop[], type: "file" | "folder") {
			const sel = getProperty(opts.src(), path)
			if (typeof sel == "string") {
				this.new(path.slice(0, -1), type)
				return
			}

			const newFilePath = path.concat("")
			opts.change(src => {
				setProperty(src, newFilePath, type == "file" ? "" : {})
			})
			this.select(newFilePath)
			this.startRename(newFilePath)
		},
		getContextMenuOptions: path => {
			const content = getProperty(opts.src(), path)
			const base = ["Rename", "Delete"]
			if (typeof content == "string") {
				return base
			} else {
				return base
			}
		},
		selectContextMenuOption(path, option) {
			console.log("selecting context menu option", path, option)
			if (option == "Rename") {
				this.startRename(path)
			} else if (option == "Delete") {
				window.confirm("delete?") && this.rm(path)
			}
		},
		cancelRename: () => {
			setRenaming(null)
		},
		startRename(path) {
			setRenaming(path)
		},
		rename(newName: string | null) {
			const path = renaming()
			if (!path) return
			const nextPath = path.slice(0, -1).concat(newName || "")
			this.move(path, nextPath)
			this.cancelRename()
			this.select(nextPath)
			console.log("renaming", path, "to", nextPath)
		},
		renaming,
		isRenaming(path?: Prop[]) {
			if (!path) return renaming() != null
			return Boolean(renaming() && eq(renaming() as Prop[], path))
		},
		getURL: opts.getURL,
	}
}

export function FileTreeProvider(
	props: FileTreeContext & {children: JSX.Element}
) {
	return (
		<FileTreeContext.Provider value={props}>
			{props.children}
		</FileTreeContext.Provider>
	)
}

export default function Chrome(
	props: AutomergeFileEditorAPI<LittlebookPluginShape> & {
		path: Prop[]
		setPath(path: Prop[]): void
		worker: PluginEditorWorker
		tsWorker: WorkerShape
		compile(): void
	}
) {
	const context = createFileTreeContext({
		getURL(path: Prop[]) {
			return `automerge:littlebook.app/${
				props.handle.documentId
			}/src/${path.join("/")}`
		},
		src: () => props.handle.doc().src,
		path: () => props.path,
		setPath: props.setPath,
		change(fn) {
			props.handle.change(doc => {
				fn(doc.src)
			})
		},
	})

	createEffect(() => {
		if (context.renaming()) {
			context.rename(
				window.prompt(
					"new name",
					context.renaming()!.slice(-1)[0] as string
				)
			)
		}
	})

	const parent = (<div />) as HTMLElement
	const doc = makeDocumentProjection(props.handle)

	const getEditorProps = () => ({
		...props,
		path: getTypescriptPath(props.path),
		parent,
		root: props.shadow,
	})

	const getCorrectEditor = () => {
		const last = props.path[props.path.length - 1]
		const editorProps = getEditorProps()
		if (typeof last == "number") {
			return createBaseEditor(editorProps)
		}
		if (last.match(/\.[tj]sx?$/)) {
			return createTypescriptEditor(editorProps)
		}
		if (last.match(/\.json$/)) {
			return createJSONEditor(editorProps)
		}
		if (last.match(/\.css$/)) {
			return createStyleEditor(editorProps)
		}
		const val = getProperty(doc.src, props.path)

		if (val && typeof val != "string") {
			return {
				dom: (
					<div>
						<Tree tree={val as LittlebookFileTree} path={props.path} />
					</div>
				),
			}
		}
		return createBaseEditor(editorProps)
	}

	const [sizes, setSizes] = makePersisted(createSignal([0.2, 0.8]), {
		name: `plugin-editor:sizes:${props.handle.url}`,
	})

	return (
		<FileTreeProvider {...context}>
			<Resizable
				class="chrome"
				initialSizes={[0.2, 0.8]}
				sizes={sizes()}
				onSizesChange={setSizes}>
				<Resizable.Panel as="aside" class="sidebar ui">
					<header
						class="sidebar__header"
						ref={element => {
							element.ondrop = event => {
								event.preventDefault()
								const data =
									event.dataTransfer?.getData("littlebook/path")
								if (data) {
									context.move(data.split("/"), [])
								}
							}
							element.ondragover = event => event.preventDefault()
						}}>
						<button onClick={() => context.new(props.path, "folder")}>
							📁 new folder
						</button>
						<button onClick={() => context.new(props.path, "file")}>
							📄 new file
						</button>
					</header>
					<nav class="sidebar__files">
						<Tree tree={doc.src} path={[]} />
					</nav>
					<footer class="sidebar__footer">
						<button onClick={props.compile}>Install</button>
					</footer>
				</Resizable.Panel>
				<Resizable.Handle class="handle" />
				<Resizable.Panel as="article" class="main ui">
					<header class="header">{props.path.join("/")}</header>
					<section class="content">{getCorrectEditor().dom}</section>
				</Resizable.Panel>
			</Resizable>
		</FileTreeProvider>
	)
}

export function Tree(props: {tree: LittlebookFileTree; path: Prop[]}) {
	const context = useFileTreeContext()
	return (
		<div
			class="tree"
			style={{"--indent-depth": props.path.length}}
			role="group">
			<For each={Object.entries(props.tree)}>
				{([name, content]) => {
					const path = props.path.concat(name)

					return (
						<Show
							when={typeof content == "string"}
							fallback={
								<TreeFolder
									path={path}
									tree={content as LittlebookFileTree}
								/>
							}>
							<TreeFile path={path} />
						</Show>
					)
				}}
			</For>
		</div>
	)
}

export function TreeFolder(props: {path: Prop[]; tree: LittlebookFileTree}) {
	const context = useFileTreeContext()
	return (
		<Collapsible
			defaultOpen={true}
			ref={element => {
				element.ondrop = event => {
					event.preventDefault()
					console.log(event)
					console.log(event.dataTransfer?.items)
					const data = event.dataTransfer?.getData("littlebook/path")
					if (data) {
						context.move(data.split("/"), props.path)
					}
				}
				element.ondragover = event => event.preventDefault()
			}}>
			<Collapsible.Trigger
				onToggle={() => context.select(props.path)}
				class="folder-collapse">
				<TreeItem path={props.path} kind="folder">
					<div class="tree-item--folder__indicator">▶︎</div>
				</TreeItem>
			</Collapsible.Trigger>
			<Collapsible.Content>
				<Tree path={props.path} tree={props.tree} />
			</Collapsible.Content>
		</Collapsible>
	)
}

export function TreeFile(props: {path: Prop[]}) {
	return <TreeItem kind="file" {...props} />
}

export function TreeItem(props: {
	kind: "file" | "folder"
	path: Prop[]
	children?: JSX.Element
}) {
	const context = useFileTreeContext()
	const name = () => props.path[props.path.length - 1]

	const selected = () => context.isSelected(props.path)

	return (
		<ContextMenu>
			<ContextMenu.Trigger class="contextmenu-trigger">
				<div
					ref={element => {
						element.draggable = true
						element.addEventListener("dragstart", event => {
							event.dataTransfer?.setData(
								"text/plain",
								context.getURL(props.path)
							)
							event.dataTransfer?.setData(
								"application/json",
								JSON.stringify({
									kind: props.kind,
									path: props.path,
								})
							)
							event.dataTransfer?.setData(
								"littlebook/url",
								context.getURL(props.path)
							)
							event.dataTransfer?.setData(
								"littlebook/path",
								props.path.join("/")
							)
						})
					}}
					aria-current={selected()}
					class={bemby("tree-item", props.kind)}
					data-path={props.path}
					style={{"--indent-depth": props.path.length}}
					onClick={() =>
						props.kind == "file" && context.select(props.path)
					}>
					{name()}
					{props.children}
				</div>
			</ContextMenu.Trigger>

			<ContextMenu.Content class="contextmenu">
				<For each={context.getContextMenuOptions(props.path)}>
					{option => (
						<ContextMenu.Item
							onSelect={() => {
								context.selectContextMenuOption(props.path, option)
							}}>
							{option}
						</ContextMenu.Item>
					)}
				</For>
			</ContextMenu.Content>
		</ContextMenu>
	)
}
