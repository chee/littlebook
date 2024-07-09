import {createSignal, For, Suspense} from "solid-js"
import {useAutomerge} from "../../automerge/use-automerge.ts"
import useDocument from "../../documents/use-document.ts"
import {
	SidebarCard,
	SidebarCardItem,
} from "../sidebar/sidebar-card/sidebar-card.tsx"
import "./primary-sidebar.scss"
import getLayout, {closeSidebar, toggleSidebar} from "../space-layout.ts"
import getGrid, {selectItem, type Dock, type UpdateGrid} from "../area/dock.ts"
import breakpoints from "../../styles/breakpoints.ts"
import {SidebarShortcut} from "./shortcuts.tsx"
import {FolderTree} from "../folder-tree/folder-tree.tsx"
import SidebarToggle from "../sidebar/sidebar-toggle.tsx"
import Menu from "../../elements/menu/menu.tsx"

import Popout from "../../elements/popout/popout.tsx"

import type {AutomergeList} from "../../types.ts"
import random from "random"
import createDocumentHandle from "../../documents/create-document-handle.ts"

export default function PrimarySidebar() {
	const automerge = useAutomerge()
	const [space, changeSpace] = useDocument<lb.Space>(() => automerge.home)
	const [grid, updateGrid] = getGrid()
	const [layout, updateLayout] = getLayout()
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
						open={() => layout.primary.open}
						toggle={() => toggleSidebar("primary", layout, updateLayout)}
						flip={false}
					/>
				</div>
				<div class="headstrip-middle" />
				<div class="headstrip-right">
					{/* <button type="button" onclick={() => setShowingSettings(true)}>
						...
					</button> */}
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
						const newFolderHandle = createDocumentHandle<lb.Folder>(
							automerge.repo,
							{
								type: "folder",
								items: [] as lb.ItemId[] as AutomergeList<lb.ItemId>,
								icon: random.choice([
									"🦔",
									"🍒",
									"🧀",
									"✨",
									"👽",
									"⭐",
									"💜",
									"🐰",
									"🐷",
								])!,
								name: "",
								note: "",
							},
						)
						changeSpace(space => {
							space.items.push(newFolderHandle.documentId as lb.FolderId)
						})
						selectItem(
							newFolderHandle.documentId as lb.FolderId,
							grid,
							updateGrid,
						)
						if (!breakpoints.m) {
							closeSidebar("primary", layout, updateLayout)
							closeSidebar("secondary", layout, updateLayout)
						}
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
