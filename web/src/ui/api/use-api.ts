// import {useContext, useMemo} from "preact/hooks"
import {createContext, useContext} from "solid-js"
import type createLittlebookAPI from "../../api/api"

export const LittlebookAPIContext =
	createContext<() => ReturnType<typeof createLittlebookAPI> | undefined>(
		undefined,
	)

export function useLittlebookAPI() {
	const lb = useContext(LittlebookAPIContext)
	if (!lb) throw new Error("you gotta wrap me in a LittlebookProvider")
	return lb
}
