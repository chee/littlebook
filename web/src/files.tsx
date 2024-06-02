import {createContext} from "preact"
import type {FunctionComponent} from "preact"
import {useContext} from "preact/hooks"

const worker = new Worker(new URL("./files.worker.ts", import.meta.url), {
	type: "module",
})

const Context = createContext(worker)

export const useFilesWorker = () => useContext(Context)

export const FilesWorkerProvider: FunctionComponent = ({children}) => {
	return <Context.Provider value={worker}>{children}</Context.Provider>
}
