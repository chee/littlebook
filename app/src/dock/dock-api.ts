import {type AutomergeUrl} from "@automerge/automerge-repo"
import type {
	DockviewApi,
	DockviewIDisposable,
	SerializedDockview,
} from "dockview-core"
import {getOwner, onCleanup, runWithOwner} from "solid-js"
import {createStore} from "solid-js/store"
import Result, {err, ok} from "true-myth/result"
import type Unit from "true-myth/unit"
import {parseDocumentURL, renderDocumentURL} from "./dock.tsx"
import {usePerfectEditor} from "../components/editor/usePerfectEditor.tsx"

export type DocumentURL = AutomergeUrl & {type: "document"}

export function createDockAPI(dockviewAPI: DockviewApi) {
	window.dockViewAPI = dockviewAPI
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
		openDocument(id: DocumentURL | AutomergeUrl, component = "document") {
			runWithOwner(getOwner() ?? owner, () => {
				const docinfo = parseDocumentURL(id as DocumentURL)
				if (!docinfo.editor) {
					const perfectEditor = usePerfectEditor(() => id as DocumentURL)()
					if (perfectEditor.isOk) {
						docinfo.editor = perfectEditor.value.id
						id = renderDocumentURL(docinfo)
					}
				}

				const existing = dockviewAPI.getPanel(id)

				if (existing) {
					existing.api.setActive()
				} else {
					dockviewAPI.addPanel({
						id,
						component,
						tabComponent: component,
						renderer: "always",
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
		closePanel(id: AutomergeUrl) {
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
			dockviewAPI.panels.map(p => p.id)
		)!,
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
				dockviewAPI.panels.map(p => p.id)
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
