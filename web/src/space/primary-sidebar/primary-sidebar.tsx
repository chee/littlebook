import {createSignal, For, Suspense} from "solid-js"
import {useLittlebookAPI} from "../../api/use-api.ts"
import {useAutomerge} from "../../automerge/use-automerge.ts"
import useDocument from "../../documents/use-document.ts"
import {
	SidebarCard,
	SidebarCardItem,
} from "../sidebar/sidebar-card/sidebar-card.tsx"
import "./primary-sidebar.scss"
import {
	closeSidebar,
	selectItem,
	toggleSidebar,
	type UI,
	type UpdateUI,
} from "../../ui/ui-state.ts"
import {useUI} from "../../ui/use-ui-state.tsx"
import breakpoints from "../../styles/breakpoints.ts"
import {SidebarShortcut} from "./shortcuts.tsx"
import {FolderTree} from "../folder-tree/folder-tree.tsx"
import SidebarToggle from "../sidebar/sidebar-toggle.tsx"
import Menu from "../../elements/menu/menu.tsx"

import Popout from "../../elements/popout/popout.tsx"

function select(itemId: lb.ItemId, ui: UI, set: UpdateUI) {
	selectItem(itemId, ui, set)
	if (!breakpoints.m) {
		closeSidebar("primary", ui, set)
		closeSidebar("secondary", ui, set)
	}
}

export default function PrimarySidebar() {
	const automerge = useAutomerge()
	const [space, changeSpace] = useDocument<lb.Space>(() => automerge.home)
	const lb = useLittlebookAPI()
	const [ui, updateUI] = useUI()
	const [showingSettings, setShowingSettings] = createSignal(false)

	return (
		<Suspense>
			<Popout when={showingSettings} close={() => setShowingSettings(false)}>
				<Menu
					options={{
						dir: "choose littlebook directory",
					}}
					select={async option => {
						if (option == "dir") {
							const dir = await showDirectoryPicker()
							if (dir) {
								console.log(dir)
							}
						}
					}}
				/>
			</Popout>
			<header class="primary-sidebar-header headstrip">
				<div class="headstrip-left">
					<SidebarToggle
						open={() => ui.layout.primary.open}
						toggle={() => toggleSidebar("primary", ui, updateUI)}
						flip={false}
					/>
				</div>
				<div class="headstrip-middle" />
				<div class="headstrip-right">
					<button type="button" onclick={() => setShowingSettings(true)}>
						...
					</button>
				</div>
			</header>
			<SidebarCard>
				<SidebarShortcut icon="📥" title="inbox" />
			</SidebarCard>
			<SidebarCard>
				<SidebarShortcut icon="⭐" title="today" />
				<SidebarShortcut icon="📆" title="upcoming" />
				<SidebarShortcut icon="🗃️" title="someday" />
			</SidebarCard>
			<SidebarCard
				title="documents"
				headerAction={{
					label: "create folder",
					icon: <strong>+</strong>,
					action() {
						const folderHandle = lb.folders.createHandle()
						folderHandle?.doc().then(folder => {
							if (folder) {
								const change = lb.spaces.addFolder(folder.id)
								change && changeSpace(change)
								select(folder.id, ui, updateUI)
							}
						})
					},
				}}>
				<For each={space()?.items}>
					{id => {
						return (
							<SidebarCardItem as="div">
								<FolderTree
									id={() => id}
									parentId={() => space()?.id}
									label="documents"
								/>
							</SidebarCardItem>
						)
					}}
				</For>
			</SidebarCard>
		</Suspense>
	)
}