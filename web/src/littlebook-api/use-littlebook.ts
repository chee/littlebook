import {useContext} from "preact/hooks"
import {LittlebookAPIContext} from "./littlebook-provider.tsx"

export function useLittlebookAPI() {
	const lb = useContext(LittlebookAPIContext)
	if (!lb) throw new Error("you gotta wrap me in a LittlebookProvider")
	return lb
}
