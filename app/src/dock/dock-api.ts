import {type AutomergeUrl} from "@automerge/automerge-repo"
import type {
	DockviewApi,
	DockviewIDisposable,
	SerializedDockview,
} from "dockview-core"
import {onCleanup} from "solid-js"
import {createStore} from "solid-js/store"
import Result, {err, ok} from "true-myth/result"
import type Unit from "true-myth/unit"

export type DocumentURL = AutomergeUrl & {type: "document"}

export function createDockAPI(dockviewAPI: DockviewApi) {
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
			const existing = dockviewAPI.getPanel(id)

			if (existing) {
				existing.api.setActive()
				// existing.api.updateParameters({id, editorID})
			} else {
				dockviewAPI.addPanel({
					id,
					component,
					tabComponent: component,
					renderer: "always",
					// params: {id, editorID},
				})
			}
		},
		loadLayout,
		loadLayoutFromLocalstorage(key = "layout"): Result<Unit, Error> {
			const layoutJSON = localStorage.getItem(key)
			try {
				const layout = JSON.parse(layoutJSON)
				return loadLayout(layout)
			} catch (error) {
				return err(
					error instanceof error
						? error
						: new Error("failed to load layout from localStorage")
				)
			}
		},
		onLayoutChange(fn: () => void) {
			const disposer = dockviewAPI.onDidLayoutChange(fn)
			onCleanup(() => disposer.dispose())
		},
		closePanel(id: AutomergeUrl) {
			dockviewAPI.getPanel(id)?.api.close()
		},
		closeGroup(id: string) {
			dockviewAPI.getGroup(id)?.api.close()
		},
		serializeLayout() {
			return dockviewAPI.toJSON()
		},
		activePanelID: dockviewAPI.activePanel?.id,
		panelIDs: dockviewAPI.panels.map(p => p.id),
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
