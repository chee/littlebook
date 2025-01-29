import {Show, For} from "solid-js"
import "./page-header.css"
import Icon from "../icons/icon.tsx"
import {Button} from "@kobalte/core/button"
import {DropdownMenu} from "@kobalte/core/dropdown-menu"
import homeURL from "../../repo/home.ts"

/* 
// todo
add a button for adding new
	- editors
	- importers
	- publishers
	- etc

add a button in the top right for
	- ✅ copying your home URL
	- ✅ swapping your home URL
	// todo
	- changing your name/profile image?
	- exporting your entire indexeddb database
	- loading an entire indexedb database
  
*/
export default function PageHeader(props: {
	leftSidebarCollapsed: boolean
	toggleLeftSidebar(): void
	// rightSidebarExpanded: boolean
	// expandRightSidebar(): void
}) {
	return (
		<header class="page-header">
			<section class="page-header__section">
				<Button
					class="sidebar-toggle sidebar-toggle--left"
					onclick={() => props.toggleLeftSidebar()}>
					<Show
						when={props.leftSidebarCollapsed}
						fallback={
							<Icon name="sidebar-minimalistic-outline" inline />
						}>
						<Icon name="sidebar-minimalistic-bold" inline />
					</Show>
				</Button>
				<div class="page-header-logo">
					<span class="page-header-logo__icon">◉</span>
					pointplace
				</div>
			</section>
			<section class="page-header__section" />
			<section class="page-header__section">
				<DropdownMenu>
					<DropdownMenu.Trigger
						class="pop-menu__trigger"
						aria-label="add document">
						<Icon name="home-bold" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Portal>
						<DropdownMenu.Content class="pop-menu__content">
							<DropdownMenu.Item
								class="pop-menu__item"
								onSelect={() => {
									navigator.clipboard.writeText(homeURL())
								}}>
								copy home url
							</DropdownMenu.Item>
							<DropdownMenu.Item
								class="pop-menu__item"
								onSelect={() => {
									const home = window.prompt(
										"paste home URL",
										homeURL()
									)
									if (home && home != homeURL()) {
										localStorage.setItem("home", home)
										localStorage.removeItem("layout")
										window.location.reload()
									}
								}}>
								set home url
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu>
			</section>
			{/* <section class="page-header__section">hehe</section> */}
		</header>
	)
}
