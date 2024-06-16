import {useParams} from "wouter-preact"
import {useLittlebookAPI} from "../../ui/api/use-api.ts"
import {typeRegistry} from "../types/type-registries.ts"
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type StateUpdater,
} from "preact/hooks"

import useFile from "../../ui/automerge/use-file.ts"
import useContent from "../use-content.ts"
import type {FunctionalComponent} from "preact"
import clsx from "clsx"
import Button from "../../ui/elements/button/button.tsx"
import {Card} from "../../ui/elements/card/card.tsx"
import cl from "../../ui/cl.ts"
import {
	SpaceStateProvider,
	useSpaceState,
} from "../../ui/littlebook/space/space-state.tsx"

const Dropdown: FunctionalComponent<{
	label: string
	isActive: boolean
	setIsActive(fn: StateUpdater<boolean>): void
}> = ({children, label = "dropdown", isActive, setIsActive}) => {
	const id = useMemo(
		() =>
			"dropdown-menu-" + Math.random().toString(36).slice(2).replace(/\d+/, ""),
		[],
	)

	const ref = useRef<HTMLDivElement>(null)

	const onclickoutside = useCallback((event: MouseEvent) => {
		if (!ref.current) return
		console.log(event.target instanceof HTMLElement, event.target, ref.current)
		if (
			ref.current &&
			event.target instanceof HTMLElement &&
			ref.current != event.target &&
			!ref.current.contains(event.target)
		) {
			setIsActive(false)
			event.stopPropagation()
		}
	}, [])

	const onescape = useCallback((event: KeyboardEvent) => {
		if (event.key == "Escape") {
			setIsActive(false)
		}
	}, [])

	useEffect(() => {
		if (isActive) {
			document.addEventListener("click", onclickoutside, true)
			document.addEventListener("keydown", onescape)
		}

		return () => {
			document.removeEventListener("click", onclickoutside, true)
			document.removeEventListener("keydown", onescape)
		}
	}, [isActive])

	return (
		<div ref={ref} class={clsx(isActive && "is-active")}>
			<Button
				active={isActive}
				type="button"
				aria-haspopup="true"
				onClick={() => setIsActive(active => !active)}
				aria-controls={id}>
				<span>{label}</span>
				<span> ⬇︎</span>
			</Button>

			<Card>
				<div id={id} role="menu" aria-orientation="vertical">
					<div class="flex flex-col gap-2">{children}</div>
				</div>
			</Card>
		</div>
	)
}

export default function InfoPanel() {
	const ui = useSpaceState()
	const fileId = ui.files.selected
	if (!fileId.value) {
		return null
	}
	const [file, changeFile] = useFile(fileId.value)
	if (!file) {
		return <div class="metadata metadata--loading metadata--loading-file" />
	}
	const [content, changeContent] = useContent<lb.AnyContent>(file.content)
	if (!content) {
		return <div class="metadata metadata--loading metadata--loading-content" />
	}

	const lb = useLittlebookAPI()
	const {projectId} = useParams()

	const switchContent = useCallback((to: lb.UniformTypeIdentifier) => {
		const convertedContentHandle = lb.contents.recode(content, to)
		if (convertedContentHandle instanceof Error) {
			// todo tell the user that it couldn't happen
			// todo notification provider
		} else {
			convertedContentHandle.doc().then(convertedContent => {
				changeFile(file => {
					if (convertedContent) file.content = convertedContent.id
				})
			})
		}
	}, [])

	const deleteFile = useCallback(() => {
		if (!file.id) {
			return
		}
		lb.files.deleteFile(file.id, projectId as lb.ProjectId)
	}, [])

	const [typeDropdownActive, setTypeDropdownActive] = useState(false)
	return (
		<div class="bg-white rounded-xl mt-4 p-4 grid grid-cols-4 gap-y-2 dark:bg-black dark:text-white">
			<label class="grid-cols-subgrid col-span-4 grid">
				<span class="font-bold">name</span>
				<input
					class="col-span-3"
					type="text"
					placeholder="Text input"
					readonly
					value={file.name}
				/>
			</label>

			<label class="grid-cols-subgrid col-span-4 grid">
				<span class="font-bold">id</span>
				<input
					class="col-span-3"
					type="text"
					placeholder="Text input"
					readonly
					value={file.id}
				/>
			</label>

			<Dropdown
				label={"type"}
				isActive={typeDropdownActive}
				setIsActive={setTypeDropdownActive}>
				{typeRegistry.forFilename(file.name).map(type => {
					const displayName = lb.contentTypes.getDisplayName(type)
					return (
						<Button
							key={type}
							onClick={event => {
								event.preventDefault()
								setTypeDropdownActive(false)
								switchContent(type)
							}}
							class={clsx(
								"py-2 px-4 block w-full",
								type == content.contentType
									? "bg-primary-100"
									: "hover:bg-primary-50",
							)}>
							{displayName || type}
						</Button>
					)
				})}
			</Dropdown>

			<Button
				class="col-start-3 col-span-2 bg-red-500 rounded-lg ring-1 ring-red-600 font-bold text-white"
				type="button"
				onClick={deleteFile}>
				destroy file
			</Button>
		</div>
	)
}
