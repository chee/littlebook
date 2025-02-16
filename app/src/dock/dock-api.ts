import type {
	DockviewApi,
	DockviewIDisposable,
	SerializedDockview,
} from "dockview-core"
import {getOwner, onCleanup, runWithOwner} from "solid-js"
import {createStore} from "solid-js/store"
import Result, {err, ok} from "true-myth/result"
import type Unit from "true-myth/unit"
import {usePerfectView} from "../components/file-viewer/usePerfectView.tsx"
import {
	asAutomergeURL,
	parseDocumentURL,
	renderDocumentURL,
	type AutomergeURLOrDocumentURL,
	type DocumentURL,
} from "@pointplace/types"

export interface OpenDocumentOptions {
	component?: string
	side?: string
}

export function createDockAPI(dockviewAPI: DockviewApi) {
	const owner = getOwner()!
	function loadLayout(layout: SerializedDockview): Result<Unit, Error> {
		try {
			dockviewAPI.fromJSON(layout)
			return ok()
		} catch {
			return err(new Error("failed to load layout"))
		}
	}
	const [dockAPI, updateAPI] = createStore({
		openDocument(url: AutomergeURLOrDocumentURL, opts?: OpenDocumentOptions) {
			const component = opts?.component ?? "document"
			runWithOwner(getOwner() ?? owner, () => {
				const docinfo = parseDocumentURL(url as DocumentURL)
				if (!docinfo.editor) {
					const perfectEditor = usePerfectView(() => url as DocumentURL)()
					if (perfectEditor) {
						docinfo.editor = perfectEditor.id
						url = renderDocumentURL(docinfo)
					}
				}

				const existing = dockviewAPI.getPanel(url)

				if (existing) {
					existing.api.setActive()
				} else {
					dockviewAPI.addPanel({
						id: url,
						component,
						tabComponent: component,
						renderer: "always",
						position: opts?.side
							? {
									direction: opts.side,
								}
							: undefined,
					})
				}
			})
		},
		loadLayout,
		loadLayoutFromLocalstorage(key = "layout"): Result<Unit, Error> {
			const layoutJSON = localStorage.getItem(key)
			try {
				const layout = JSON.parse(layoutJSON!)
				return loadLayout(layout)
			} catch (error) {
				return err(
					error instanceof Error
						? error
						: new Error("failed to load layout from localStorage")
				)
			}
		},
		onLayoutChange(fn: () => void) {
			runWithOwner(getOwner() ?? owner, () => {
				const disposer = dockviewAPI.onDidLayoutChange(fn)
				onCleanup(() => disposer.dispose())
			})
		},
		closePanel(id: DocumentURL) {
			runWithOwner(getOwner() ?? owner, () => {
				dockviewAPI.getPanel(id)?.api.close()
			})
		},
		closeGroup(id: string) {
			runWithOwner(getOwner() ?? owner, () => {
				dockviewAPI.getGroup(id)?.api.close()
			})
		},
		serializeLayout() {
			return dockviewAPI.toJSON()
		},
		activePanelID: runWithOwner(
			getOwner() ?? owner,
			() => dockviewAPI.activePanel?.id as DocumentURL | undefined
		),
		panelIDs: runWithOwner(getOwner() ?? owner, () =>
			dockviewAPI.panels.map(p => p.id as DocumentURL)
		)!,
		// todo this is very specific.
		isPressed(url: AutomergeURLOrDocumentURL) {
			if (!dockAPI.activePanelID) return "false"
			return asAutomergeURL(dockAPI.activePanelID) == url
				? "true"
				: dockAPI.panelIDs.includes(url as DocumentURL)
					? "mixed"
					: "false"
		},
	})

	const disposers: DockviewIDisposable[] = []

	disposers.push(
		dockviewAPI.onDidActivePanelChange(panel => {
			updateAPI("activePanelID", panel?.id)
		})
	)

	disposers.push(
		dockviewAPI.onDidLayoutChange(() => {
			updateAPI(
				"panelIDs",
				dockviewAPI.panels.map(p => p.id as DocumentURL)
			)
		})
	)

	onCleanup(() => {
		for (const disposer of disposers) {
			disposer.dispose()
		}
	})

	return dockAPI
}
