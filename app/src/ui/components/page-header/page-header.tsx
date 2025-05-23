import {Show} from "solid-js"
import "./page-header.css"
import Icon from "../icons/icon.tsx"
import {Button} from "@kobalte/core/button"
import {DropdownMenu} from "@kobalte/core/dropdown-menu"
import {useUserId} from ":/domain/user/user-id.ts"
import type {UserURL} from ":/docs/user-doc.ts"
import {decodeJSON, encodeJSON} from ":/core/compress.ts"
import {isValidAutomergeURL} from ":/core/sync/url.ts"

/*
add a button in the top right for
	- ✅ copying your home URL
	- ✅ swapping your home URL
	// todo
	- changing your name/profile image?
	- exporting your entire indexeddb database
	- loading an entire indexedb database
*/
export default function PageHeader(props: {
	sidebarIsCollapsed: boolean
	toggleSidebar(): void
	// rightSidebarExpanded: boolean
	// expandRightSidebar(): void
}) {
	const [userId, setUserId] = useUserId()
	return (
		<header class="page-header">
			<section class="page-header__section">
				<Button
					class="sidebar-toggle sidebar-toggle--left"
					onclick={() => props.toggleSidebar()}>
					<Show
						when={props.sidebarIsCollapsed}
						fallback={
							<Icon name="sidebar-minimalistic-outline" inline />
						}>
						<Icon name="sidebar-minimalistic-bold" inline />
					</Show>
				</Button>
				<div class="page-header-logo">
					<span class="page-header-logo__icon">◉</span>
					littlebook
				</div>
			</section>
			<section class="page-header__section" />
			<section class="page-header__section">
				<DropdownMenu>
					<DropdownMenu.Trigger
						class="popmenu__trigger"
						aria-label="add document">
						<Icon name="home-bold" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Portal>
						<DropdownMenu.Content class="popmenu__content">
							<DropdownMenu.Item
								class="popmenu__item"
								onSelect={() => {
									navigator.clipboard.writeText(
										encodeJSON({
											type: "user",
											url: userId(),
										}),
									)
								}}>
								copy user code
							</DropdownMenu.Item>
							<DropdownMenu.Item
								class="popmenu__item"
								onSelect={() => {
									// todo move this to a reusable piece of code shared
									// with intro page
									const user = window.prompt(
										"paste home URL",
										encodeJSON({
											type: "user",
											url: userId(),
										}),
									)
									if (user) {
										const result = decodeJSON<{
											type: "user"
											url: UserURL
										}>(user)
										if (
											result?.type == "user" &&
											isValidAutomergeURL(result?.url)
										) {
											setUserId(result.url)
											// todo this shouldn't be hardcoded here silly rabbit
											localStorage.removeItem("littlebook:layout")
											window.location.reload()
										}
									}
								}}>
								set user code
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu>
			</section>
		</header>
	)
}
