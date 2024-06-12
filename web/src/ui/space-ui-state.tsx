import {signal} from "@preact/signals"
import {createContext, type FunctionalComponent, createRef} from "preact"
import {useContext} from "preact/hooks"
import type {ImperativePanelHandle} from "react-resizable-panels"

export function createSpaceUIState() {
	return {
		layout: {
			sidebars: {
				primary: {
					open: signal(true),
					ref: createRef<ImperativePanelHandle>(),
				},
				secondary: {
					open: signal(true),
					ref: createRef<ImperativePanelHandle>(),
				},
			},
		},
		projects: {
			selected: signal<lb.ProjectId | null>(null),
			renaming: signal<lb.ProjectId | null>(null),
		},
		files: {
			selected: signal<lb.FileId | null>(null),
			renaming: signal<lb.FileId | null>(null),
		},
	}
}

type SpaceUIState = ReturnType<typeof createSpaceUIState>

const SpaceUIStateContext = createContext<SpaceUIState>(createSpaceUIState())

export const SpaceUIStateProvider: FunctionalComponent = ({children}) => {
	return (
		<SpaceUIStateContext.Provider value={createSpaceUIState()}>
			{children}
		</SpaceUIStateContext.Provider>
	)
}

export function useSpaceUIState() {
	return useContext(SpaceUIStateContext)
}
