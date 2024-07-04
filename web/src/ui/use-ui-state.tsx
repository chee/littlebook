import {createContext, useContext, type ParentComponent} from "solid-js"
import {createUI, type UI} from "./ui-state.ts"
import type {SetStoreFunction} from "solid-js/store"

export const UIContext = createContext<[UI, SetStoreFunction<UI>]>()

export const UIProvider: ParentComponent = props => {
	const ui = createUI()
	return <UIContext.Provider value={ui}>{props.children}</UIContext.Provider>
}
export function useUI() {
	const context = useContext(UIContext)
	if (!context)
		throw new Error("you gotta wrap me in a UIContext with a valid ui")
	return context
}
