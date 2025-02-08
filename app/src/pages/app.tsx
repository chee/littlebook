import {createSignal} from "solid-js"
import "./app.css"
import {type ContextValue} from "corvu/resizable"
import {makePersisted} from "@solid-primitives/storage"
import PageHeader from "../components/page-header/page-header.tsx"
import Icon from "../components/icons/icon.tsx"
import FileViewer from "../components/editor/editor.tsx"
import {Dock, DockProvider} from "../dock/dock.tsx"
import DockTab from "../dock/dock-tab.tsx"
import Workspace from "../components/workspace/workspace.tsx"
import * as codemirror from "@littlebook/text/codemirror-editor.ts"
import {DropdownMenu} from "@kobalte/core/dropdown-menu"
import {useEditorRegistry} from "../registries/editor-registry.ts"
import markdownPreview from "../editors/markdown-preview.tsx"

// todo maybe editors should be passed a `setMeta` function and a `meta` object
// that they own. stored in the entry itself or in the user's home, perhaps
export default function App() {
	const [resizableContext, setResizableContext] = createSignal<ContextValue>()

	const editorRegistry = useEditorRegistry()

	/* 	editorRegistry.register(
		{
			displayName: "Tldraw",
			id: "tldraw",
			contentTypes: ["tldraw"],
		},
		tldraw
	)
	*/

	editorRegistry.register(codemirror)
	editorRegistry.register(markdownPreview)

	const defaultSizes = [0.2, 0.8]

	const [sizes, setSizes] = makePersisted(
		// eslint-disable-next-line solid/reactivity
		createSignal<number[]>(defaultSizes),
		{
			name: "workspace-layout",
		}
	)

	if (!sizes().length || sizes().every(n => n <= 0)) {
		setSizes(defaultSizes)
	}

	const leftSidebarCollapsed = () => sizes()[0] === 0

	const toggleLeftSidebar = () => {
		if (leftSidebarCollapsed()) {
			resizableContext()?.expand(0, "following")

			if (leftSidebarCollapsed()) {
				setSizes(() => [
					lastLeftSidebarExpandedSize(),
					1 - lastLeftSidebarExpandedSize(),
				])
			}
		} else {
			resizableContext()?.collapse(0, "following")
		}
	}

	const [lastLeftSidebarExpandedSize, setLastLeftSidebarExpandedSize] =
		createSignal(defaultSizes[0])

	return (
		<div class="app">
			<DockProvider
				components={{
					document: props => {
						return (
							<FileViewer
								url={props.id}
								isActive={props.dockAPI.activePanelID == props.id}
							/>
						)
					},
				}}
				tabComponents={{
					document: props => {
						return <DockTab url={props.id} />
					},
				}}
				watermarkComponent={() => <div class="dock-watermark" />}
				rightHeaderActionComponent={props => (
					<div class="dock-header-actions">
						<DropdownMenu>
							<DropdownMenu.Trigger
								class="pop-menu__trigger dock-header-actions__button"
								aria-label="more actions">
								<Icon name="menu-dots-bold" inline />
							</DropdownMenu.Trigger>
							<DropdownMenu.Portal>
								<DropdownMenu.Content class="pop-menu__content">
									<DropdownMenu.Item
										class="pop-menu__item"
										onSelect={() => {
											props.dockAPI.closeGroup(props.groupID)
										}}>
										close group
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu>
					</div>
				)}>
				<PageHeader
					leftSidebarCollapsed={leftSidebarCollapsed()}
					toggleLeftSidebar={toggleLeftSidebar}
				/>

				<Workspace
					sizes={sizes()}
					setSizes={setSizes}
					setLastLeftSidebarExpandedSize={setLastLeftSidebarExpandedSize}
					setResizableContext={setResizableContext}>
					<Dock />
				</Workspace>
			</DockProvider>
		</div>
	)
}
