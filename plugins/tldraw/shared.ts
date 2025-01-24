import type {TldrawFile as TldrawFileInterface, TLRecord} from "tldraw"
export type TldrawFile = TldrawFileInterface &
	Record<string, any> & {
		records: TLRecord[]
	}
