import type {TldrawFile as TldrawFileInterface, TLRecord} from "tldraw"
import type {AutomergeList} from "../../web/src/types.ts"
export type TldrawFile = TldrawFileInterface &
	Record<string, any> & {
		records: AutomergeList<TLRecord>
	}
