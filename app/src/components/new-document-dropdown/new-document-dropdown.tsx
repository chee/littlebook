import {For} from "solid-js"
import {DropdownMenu} from "@kobalte/core/dropdown-menu"
import "./new-document-dropdown.css"
import Icon from "../icon/icon.tsx"

export default function NewDocumentMenu(props: {
	creators: {label: string; id: string}[]
	create(id: string): void
	importers: {label: string; id: string}[]
	import(id: string): void
}) {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger
				class="pop-menu__trigger"
				aria-label="add document">
				<Icon icon="solar:add-circle-linear" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content class="pop-menu__content">
					<DropdownMenu.Sub overlap gutter={-10}>
						<DropdownMenu.SubTrigger class="pop-menu__sub-trigger">
							create
							<div class="pop-menu__item-right-slot">
								<Icon icon="solar:alt-arrow-right-linear" />
							</div>
						</DropdownMenu.SubTrigger>
						<DropdownMenu.Portal>
							<DropdownMenu.SubContent class="pop-menu__sub-content">
								<For each={props.creators}>
									{({id, label}) => {
										return (
											<DropdownMenu.Item
												class="pop-menu__item"
												onSelect={() => props.create(id)}>
												{label}
											</DropdownMenu.Item>
										)
									}}
								</For>
							</DropdownMenu.SubContent>
						</DropdownMenu.Portal>
					</DropdownMenu.Sub>

					<DropdownMenu.Sub overlap gutter={4} shift={-8}>
						<DropdownMenu.SubTrigger class="pop-menu__sub-trigger">
							import
							<div class="pop-menu__item-right-slot">
								<Icon icon="solar:alt-arrow-right-linear" />
							</div>
						</DropdownMenu.SubTrigger>
						<DropdownMenu.Portal>
							<DropdownMenu.SubContent class="pop-menu__sub-content">
								<For each={props.importers}>
									{({id, label}) => {
										return (
											<DropdownMenu.Item
												class="pop-menu__item"
												onSelect={() => props.import(id)}>
												{label}
											</DropdownMenu.Item>
										)
									}}
								</For>
							</DropdownMenu.SubContent>
						</DropdownMenu.Portal>
					</DropdownMenu.Sub>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu>
	)
}
