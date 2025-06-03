import {
	asAutomergeURL,
	isValidDocumentURL,
	parseDocumentURL,
	renderDocumentURL,
	type AutomergeURLOrDocumentURL,
	type DocumentURL,
} from ":/core/sync/url.ts"
import {usePerfectView} from ":/ui/components/view/usePerfectView"
import type {StandaloneViewID} from "@littlebook/plugin-api/types/view.ts"
import type {
	DockviewApi,
	DockviewIDisposable,
	SerializedDockview,
} from "dockview-core"
import {getOwner, onCleanup, runWithOwner} from "solid-js"
import {createStore} from "solid-js/store"

export interface OpenDocumentOptions {
	component?: string
	side?: string
}

type PanelID = DocumentURL | StandaloneViewID

export function createDockAPI(dockviewAPI: DockviewApi) {
	const owner = getOwner()!
	function loadLayout(layout: SerializedDockview): Error | undefined {
		try {
			dockviewAPI.fromJSON(layout)
		} catch {
			return new Error("failed to load layout")
		}
	}
	const [dockAPI, updateAPI] = createStore({
		openStandaloneView(id: StandaloneViewID, opts?: OpenDocumentOptions) {
			runWithOwner(getOwner() ?? owner, () => {
				dockviewAPI.addPanel({
					id: id.startsWith("standalone:") ? id : `standalone:${id}`,
					component: "standalone",
					tabComponent: "standalone",
					renderer: "always",
					position: opts?.side ? {direction: opts.side} : undefined,
				})
			})
		},
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
						position: opts?.side ? {direction: opts.side} : undefined,
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
						: new Error("failed to load layout from localStorage"),
				)
			}
		},
		onLayoutChange(fn: () => void) {
			runWithOwner(getOwner() ?? owner, () => {
				const disposer = dockviewAPI.onDidLayoutChange(fn)
				onCleanup(() => disposer.dispose())
			})
		},
		closePanel(id: PanelID) {
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
			() => dockviewAPI.activePanel?.id as PanelID | undefined,
		),
		panelIDs: runWithOwner(getOwner() ?? owner, () =>
			dockviewAPI.panels.map(p => p.id as PanelID),
		)!,
		// todo this is very specific.
		isPressed(panelID: AutomergeURLOrDocumentURL | StandaloneViewID) {
			const active = dockAPI.activePanelID
			if (!active) return "false"
			if (panelID == active) return "true"
			if (`standalone:${panelID}` == active) return "true"
			return isValidDocumentURL(active) && asAutomergeURL(active) == panelID
				? "true"
				: dockAPI.panelIDs.includes(panelID as DocumentURL)
					? "mixed"
					: "false"
		},
	})

	const disposers: DockviewIDisposable[] = []

	disposers.push(
		dockviewAPI.onDidActivePanelChange(panel => {
			updateAPI("activePanelID", panel?.id)
		}),
	)

	disposers.push(
		dockviewAPI.onDidLayoutChange(() => {
			updateAPI(
				"panelIDs",
				dockviewAPI.panels.map(p => p.id as DocumentURL),
			)
		}),
	)

	onCleanup(() => {
		for (const disposer of disposers) {
			disposer.dispose()
		}
	})

	return dockAPI
}
