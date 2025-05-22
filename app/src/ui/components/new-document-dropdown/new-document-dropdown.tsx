import {For} from "solid-js"
import {DropdownMenu} from "@kobalte/core/dropdown-menu"
import "./new-document-dropdown.css"
import Icon from "../icons/icon.tsx"
import {useSourceRegistry} from ":/registries/source-registry.ts"

export default function NewDocumentMenu(props: {
	create(opts: {name: string; content: unknown; creator: string}): void
}) {
	const sources = useSourceRegistry()

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger
				class="pop-menu__trigger"
				aria-label="add document">
				<Icon name="add-circle-linear" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content class="pop-menu__content">
					<DropdownMenu.Sub overlap gutter={-10}>
						<DropdownMenu.SubTrigger class="pop-menu__sub-trigger">
							create
							<div class="pop-menu__item-right-slot">
								<Icon name="alt-arrow-right-linear" />
							</div>
						</DropdownMenu.SubTrigger>
						<DropdownMenu.Portal>
							<DropdownMenu.SubContent class="pop-menu__sub-content">
								<For each={Object.entries(sources.records)}>
									{([id, source]) => {
										if (source.category !== "new") return
										return (
											<DropdownMenu.Item
												class="pop-menu__item"
												// eslint-disable-next-line solid/reactivity
												onSelect={async () => {
													const [content, info] =
														await source.new()
													props.create({
														name:
															info?.name ??
															`new ${source.displayName}`,
														content,
														creator: id,
													})
												}}>
												{source.displayName}
											</DropdownMenu.Item>
										)
									}}
								</For>
							</DropdownMenu.SubContent>
						</DropdownMenu.Portal>
					</DropdownMenu.Sub>

					<DropdownMenu.Item
						class="pop-menu__item"
						// eslint-disable-next-line solid/reactivity
						onSelect={async () => {
							// // todo move this somewhere sensible
							// // todo make this make sense
							// const fsa = await import("file-system-access")
							// const [computerFileHandle] = await fsa.showOpenFilePicker({
							// 	_preferPolyfill: false,
							// 	multiple: false,
							// })
							// const computerFile = await computerFileHandle.getFile()
							// const relevantCoders = Array.from(
							// 	sources.forMIMEType(computerFile.type) ||
							// 		sources.forFilename(computerFile.name),
							// )
							// // let coder: Coder | undefined
							// if (relevantCoders.length == 0) {
							// 	const importAsText = prompt(
							// 		"unrecognized file type, import as text?",
							// 	)
							// 	if (
							// 		importAsText != null &&
							// 		importAsText.toLowerCase().trim().slice(0, 2) !==
							// 			"no"
							// 	) {
							// 		coder = sources.records["code"]!
							// 	}
							// } else if (relevantCoders.length == 1) {
							// 	coder = relevantCoders[0]
							// } else if (relevantCoders.length > 1) {
							// 	coder = await new Promise(resolve => {
							// 		const options = relevantCoders.map(coder => ({
							// 			label: coder.displayName,
							// 			value: coder,
							// 		}))
							// 		const select = document.createElement("select")
							// 		select.style.position = "fixed"
							// 		select.style.top = "0"
							// 		select.style.left = "0"
							// 		select.style.zIndex = "1000"
							// 		select.innerHTML = options
							// 			.map(
							// 				option =>
							// 					`<option value="${option.value}">${option.label}</option>`,
							// 			)
							// 			.join("")
							// 		select.addEventListener("change", () => {
							// 			resolve(options[select.selectedIndex].value)
							// 		})
							// 		select.addEventListener("keydown", e => {
							// 			if (e.key === "Enter") {
							// 				resolve(options[select.selectedIndex].value)
							// 			}
							// 		})
							// 		document.body.appendChild(select)
							// 	})
							// }
							// if (coder) {
							// 	const content = await coder.fromFile?.(computerFile)
							// 	if (content?.ok) {
							// 		props.create({
							// 			name:
							// 				computerFileHandle.name ??
							// 				`${coder.displayName} file`,
							// 			content: content.val,
							// 			creator: coder.id,
							// 		})
							// 	} else if (content && !content.ok) {
							// 		console.error(content.err)
							// 		alert("failed to import file")
							// 	}
							// }
						}}>
						import
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu>
	)
}
