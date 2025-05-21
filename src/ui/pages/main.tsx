import "./main.css"
import {createEffect, createSignal, onCleanup} from "solid-js"
import {type ContextValue} from "@corvu/resizable"
import {makePersisted} from "@solid-primitives/storage"
import {DropdownMenu} from "@kobalte/core/dropdown-menu"
import {usePluginAPI} from ":/plugins/plugin-api.ts"
import activateBasePlugin from ":/plugins/base/base-plugin.ts"
import {useViewRegistry} from ":/registries/view-registry.ts"
import {useSourceRegistry} from ":/registries/source-registry.ts"
import {useUserDocContext} from ":/domain/user/user.ts"
import PageHeader from ":/ui/components/page-header/page-header.tsx"
import {useHotkeys} from ":/ui/lib/useHotkeys.ts"
import Modmask from ":/ui/lib/modmask.ts"
import DockProvider, {Dock} from ":/ui/dock/dock.tsx"
import FileViewer from ":/ui/components/file-viewer/file-viewer.tsx"
import DockTab from ":/ui/dock/dock-tab.tsx"
import Icon from ":/ui/components/icons/icon.tsx"
import Workspace from ":/ui/components/workspace/workspace.tsx"

export default function Main() {
	const [resizableContext, setResizableContext] = createSignal<ContextValue>()
	const pluginAPI = usePluginAPI()
	activateBasePlugin(pluginAPI)

	const user = useUserDocContext()
	const sourceRegistry = useSourceRegistry()
	// const sinkRegistry = useSinkRegistry()
	const viewRegistry = useViewRegistry()

	createEffect(() => {
		// for (const sinkURL of home()?.sinks ?? []) {
		// 	sinkRegistry.maybe(sinkURL)
		// }
		for (const sourceURL of user()?.sources ?? []) {
			sourceRegistry.maybe(sourceURL)
		}
		for (const viewURL of user()?.views ?? []) {
			viewRegistry.maybe(viewURL)
		}
	})
	// todo adopt the much better sidebar logic from nextaction

	const defaultSizes = [0.2, 0.8]

	const [sizes, setSizes] = makePersisted(
		// eslint-disable-next-line solid/reactivity
		createSignal<number[]>(defaultSizes),
		{
			name: "littlebook:layout",
		},
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

	useHotkeys("command+backslash", toggleLeftSidebar)

	function onkeydown(event: KeyboardEvent) {
		const modmask = new Modmask(event)
		if (modmask.only.meta && event.key == "\\") toggleLeftSidebar()
	}

	window.addEventListener("keydown", onkeydown)
	onCleanup(() => window.removeEventListener("keydown", onkeydown))

	const [lastLeftSidebarExpandedSize, setLastLeftSidebarExpandedSize] =
		createSignal(defaultSizes[0])

	return (
		<div class="main">
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
