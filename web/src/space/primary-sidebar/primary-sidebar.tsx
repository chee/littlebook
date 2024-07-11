import {createSignal, For, getOwner, runWithOwner, Suspense} from "solid-js"
import {useAutomerge} from "../../automerge/use-automerge.ts"
import useDocument from "../../documents/use-document.ts"
import {
	SidebarCard,
	SidebarCardItem,
} from "../sidebar/sidebar-card/sidebar-card.tsx"
import "./primary-sidebar.scss"
import getLayout, {closeSidebar, toggleSidebar} from "../space-layout.ts"
import {selectItem} from "../area/dock.ts"
import breakpoints from "../../styles/breakpoints.ts"
import {SidebarShortcut} from "./shortcuts.tsx"
import {FolderTree} from "../folder-tree/folder-tree.tsx"
import SidebarToggle from "../sidebar/sidebar-toggle.tsx"
import Menu from "../../elements/menu/menu.tsx"

import Popout from "../../elements/popout/popout.tsx"

import type {AutomergeList} from "../../types.ts"
import random from "random"
import createDocumentHandle from "../../documents/create-document-handle.ts"
import {importPlugin} from "../../plugins/plugins.ts"
import {getElementBounds} from "@solid-primitives/bounds"

export default function PrimarySidebar() {
	let automerge = useAutomerge()
	let [space, changeSpace] = useDocument<lb.Space>(() => automerge.home)

	let [layout, updateLayout] = getLayout()
	let [showingSettings, setShowingSettings] = createSignal(false)
	let owner = getOwner()

	let dotdotdot: HTMLButtonElement | undefined

	return (
		<Suspense>
			<Popout
				box={getElementBounds(dotdotdot)}
				when={showingSettings}
				close={() => setShowingSettings(false)}>
				<Menu
					options={{
						// dir: "choose littlebook directory",
						plugin: "install plugin",
					}}
					select={async option => {
						// if (option == "dir") {
						// 	let dir = await showDirectoryPicker()
						// 	if (dir) {
						// 		console.log(dir)
						// 	}
						// }

						if (option == "plugin") {
							let fsa = await import("file-system-access")
							let [computerFileHandle] = await fsa.showOpenFilePicker({
								_preferPolyfill: false,
								multiple: false,
								types: [
									{
										description: "littlebook plugins",
										accept: {"application/tar": ["*.lbplugin"]},
									},
								],
								accepts: [
									{
										extensions: ["lbplugin"],
									},
								],
							})

							let computerFile = await computerFileHandle.getFile()

							runWithOwner(owner, () => importPlugin(computerFile))
						}
						setShowingSettings(false)
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
					<button
						type="button"
						onclick={() => setShowingSettings(true)}
						ref={dotdotdot}>
						...
					</button>
				</div>
			</header>
			<SidebarCard hidden>
				<SidebarShortcut icon="📥" title="inbox" />
			</SidebarCard>
			<SidebarCard hidden>
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
						let newFolderHandle = createDocumentHandle<lb.Folder>(
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
						selectItem(newFolderHandle.documentId as lb.FolderId)
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
