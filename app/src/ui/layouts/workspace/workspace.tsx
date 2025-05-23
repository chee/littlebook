import "./workspace.css"
import Resizable, {
	type ContextValue as ResizableContext,
} from "@corvu/resizable"
import {
	createSignal,
	getOwner,
	onCleanup,
	onMount,
	runWithOwner,
	type JSX,
} from "solid-js"
import type {SerializedDockview} from "dockview-core"
import {useDockAPI} from ":/ui/dock/dock.tsx"
import {asDocumentURL, isValidDocumentURL} from ":/core/sync/url.ts"
import Sidebar from ":/ui/components/sidebar/left-sidebar.tsx"
import bemby from "@chee/bemby"

import {createMediaQuery} from "@solid-primitives/media"
import type {StandaloneViewID} from "@littlebook/plugin-api/types/view.ts"
import {makePersisted} from "@solid-primitives/storage"
import {useHotkeys} from ":/ui/lib/useHotkeys.ts"
const isMobile = createMediaQuery("(max-width: 600px)")

export function Workspace(props: {children: JSX.Element}) {
	// todo this is obviously in the wrong place, should be elsewhere. but where?
	const dockAPI = useDockAPI()
	const owner = getOwner()
	function onhash() {
		const hash = location.hash.slice(1)
		if (isValidDocumentURL(hash)) {
			if (dockAPI.activePanelID !== asDocumentURL(hash)) {
				runWithOwner(owner, () => {
					dockAPI.openDocument(hash)
				})
			}
		} else if (hash.startsWith("standalone:")) {
			if (!dockAPI.panelIDs.includes(hash as StandaloneViewID)) {
				runWithOwner(owner, () => {
					dockAPI.openStandaloneView(hash as StandaloneViewID)
				})
			}
		}
	}
	const loadhash = location.hash.slice(1)
	window.addEventListener("hashchange", onhash)
	onCleanup(() => {
		window.removeEventListener("hashchange", onhash)
	})
	dockAPI.onLayoutChange(() => {
		const layout: SerializedDockview = dockAPI.serializeLayout()
		localStorage.setItem("littlebook:dock", JSON.stringify(layout))
		const hash = dockAPI?.activePanelID
		if (hash) {
			location.hash = hash
		} else {
			location.hash = ""
		}
	})
	const mySerializedLayout = localStorage.getItem("littlebook:dock")
	if (mySerializedLayout) {
		try {
			const layout = JSON.parse(mySerializedLayout)
			dockAPI.loadLayout(layout)
		} catch {
			console.error("failed to load layout")
		}
	}
	if (isValidDocumentURL(loadhash)) {
		if (dockAPI.activePanelID !== loadhash) {
			dockAPI.openDocument(loadhash)
		}
	}

	// todo ok
	const [firstLoad, setFirstLoad] = createSignal(true)

	onMount(() => {
		if (isMobile()) {
			resizableContext()?.collapse(0)
		} else {
			const preferred = preferredSidebarSize()
			resizableContext()?.setSizes([preferred, 1 - preferred])
		}
		setTimeout(() => {
			setFirstLoad(false)
		})
	})

	const defaultSizes = [0.2, 0.8]
	// eslint-disable-next-line solid/reactivity
	const [sizes, setSizes] = makePersisted(
		createSignal<number[]>(defaultSizes),
		{
			name: "littlebook:layout",
		},
	)
	const [preferredSidebarSize, setPreferredSidebarSize] = makePersisted(
		// eslint-disable-next-line solid/reactivity
		createSignal(defaultSizes[0]),
	)

	const [sidebarElement, setSidebarElement] = createSignal<HTMLElement>()

	const [manuallyDragging, setManuallyResizing] = createSignal(false)

	const [resizableContext, setResizableContext] =
		createSignal<ResizableContext>()
	const sidebarIsCollapsed = () => resizableContext()?.sizes()[0] === 0

	const currentSidebarSize = () => {
		return resizableContext()?.sizes()[0]
	}

	function onSizesChange(sizes: number[]) {
		setSizes(sizes)
	}

	function onHandleDragStart() {
		setManuallyResizing(true)
	}

	function onHandleDragEnd() {
		setManuallyResizing(false)
		const current = currentSidebarSize()
		if (typeof current == "number" && current > 0) {
			const el = sidebarElement()
			if (el) {
				const rect = el.getBoundingClientRect()
				const width = rect.width
				if (width < 160) {
					collapseSidebar()
				} else {
					setPreferredSidebarSize(current)
				}
			}
		}
	}

	const expandSidebar = () => {
		const context = resizableContext()
		const preferred = preferredSidebarSize()
		if (preferred <= 0) {
			setPreferredSidebarSize(0.2)
		}

		context?.setSizes([preferred, 1 - preferred])
	}

	const collapseSidebar = () => {
		const context = resizableContext()
		setPreferredSidebarSize(currentSidebarSize() || 0.2)

		context?.collapse(0)
		context?.setSizes([0, 1])
	}

	const toggleSidebar = () => {
		if (sidebarIsCollapsed()) {
			expandSidebar()
		} else {
			collapseSidebar()
		}
	}

	useHotkeys("command+backslash", toggleSidebar)

	return (
		<Resizable
			sizes={sizes() ?? defaultSizes}
			onSizesChange={onSizesChange}
			class={bemby("workspace", {
				mobile: isMobile(),
				desktop: !isMobile(),
				"showing-sidebar": !sidebarIsCollapsed(),
				"not-showing-sidebar": sidebarIsCollapsed(),
				"first-load": firstLoad(),
				"manually-resizing": manuallyDragging(),
			})}>
			{() => {
				setResizableContext(Resizable.useContext())
				return (
					<>
						<Resizable.Panel
							as="aside"
							class="workspace__panel workspace__panel--sidebar"
							ref={element => setSidebarElement(element)}
							collapsible>
							<Sidebar collapse={collapseSidebar} />
						</Resizable.Panel>
						<Resizable.Handle
							class="workspace__handle"
							onHandleDragStart={onHandleDragStart}
							onHandleDragEnd={onHandleDragEnd}
							onDblClick={() => {
								if (sidebarIsCollapsed()) expandSidebar()
								else collapseSidebar()
							}}
						/>
						<Resizable.Panel class="workspace__panel workspace__panel--main">
							{props.children}
						</Resizable.Panel>
					</>
				)
			}}
		</Resizable>
	)
}
