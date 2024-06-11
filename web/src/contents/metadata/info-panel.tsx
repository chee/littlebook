import {useParams} from "wouter-preact"
import {useLittlebookAPI} from "../../api/use-littlebook-api.ts"
import {
	coderRegistry,
	typeRegistry,
	type ContentView,
} from "../types/type-registries.ts"
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type StateUpdater,
} from "preact/hooks"

import useFile from "../../files/use-file.ts"
import {metadataViewRegistry} from "../types/type-registries.ts"
import useContent from "../use-content.ts"
import {LuArrowDown} from "react-icons/lu"
import type {FunctionalComponent} from "preact"
import clsx from "clsx"

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
		if (
			ref.current &&
			event.target instanceof HTMLElement &&
			!ref.current.contains(event.target)
		)
			setIsActive(false)
	}, [])

	const onescape = useCallback((event: KeyboardEvent) => {
		if (event.key == "Escape") {
			setIsActive(false)
		}
	}, [])

	useEffect(() => {
		document.addEventListener("click", onclickoutside, true)
		document.addEventListener("keydown", onescape)
		return () => {
			document.removeEventListener("click", onclickoutside, true)
			document.removeEventListener("keydown", onescape)
		}
	}, [])

	return (
		<div ref={ref} class={clsx("dropdown", isActive && "is-active")}>
			<div class="dropdown-trigger">
				<button
					type="button"
					class="button"
					aria-haspopup="true"
					onClick={() => setIsActive(active => !active)}
					aria-controls={id}>
					<span>{label}</span>
					<span class="icon is-small">
						<LuArrowDown />
					</span>
				</button>
			</div>
			<div class="dropdown-menu" id={id} role="menu">
				<div class="dropdown-content">{children}</div>
			</div>
		</div>
	)
}

export default function InfoPanel({fileId}: {fileId: lb.FileId}) {
	const [file, changeFile] = useFile(fileId)
	if (!file) {
		return <div class="metadata metadata--loading metadata--loading-file" />
	}
	const [content, changeContent] = useContent<lb.AnyContent>(file.content)
	if (!content) {
		return <div class="metadata metadata--loading metadata--loading-content" />
	}
	if (!file) return <div />
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
		<div>
			<div class="field">
				<label class="label">name</label>
				<div class="control">
					<input
						class="input"
						type="text"
						placeholder="Text input"
						readonly
						value={file.name}
					/>
				</div>
			</div>
			<div class="field">
				<label class="label">id</label>
				<div class="control">
					<input
						class="input"
						type="text"
						placeholder="Text input"
						readonly
						value={file.id}
					/>
				</div>
			</div>

			<Dropdown
				label={lb.contentTypes.getDisplayName(content.contentType)}
				isActive={typeDropdownActive}
				setIsActive={setTypeDropdownActive}>
				{typeRegistry.forFilename(file.name).map(type => {
					const displayName = lb.contentTypes.getDisplayName(type)
					return (
						<button
							type="button"
							key={type}
							onClick={event => {
								event.preventDefault()
								setTypeDropdownActive(false)
								switchContent(type)
							}}
							class={clsx(
								"dropdown-item",
								type == content.contentType && "is-active",
							)}>
							{displayName || type}
						</button>
					)
				})}
			</Dropdown>
			<button type="button" onClick={deleteFile}>
				destroy file
			</button>
		</div>
	)
}
