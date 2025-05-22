// import {
// 	createContext,
// 	createEffect,
// 	getOwner,
// 	runWithOwner,
// 	useContext,
// 	type JSX,
// } from "solid-js"
// import {useIsRouting} from "@solidjs/router"
// import {createStore, reconcile} from "solid-js/store"
// import debug from "debug"
// const log = debug("littlebook:command-registry")

// type CommandMap = Record<string, Command<unknown>>
// type CommandContext = {
// 	commands: CommandMap
// 	setCommands(map: CommandMap): void
// 	resetCommands(): void
// 	addCommand(cmd: Command<unknown>): void
// 	has(id: Command<unknown>["id"]): boolean
// 	exe: <Payload>(id: Command<Payload>["id"], payload?: Payload) => void
// }
// const CommandRegistryContext = createContext<CommandContext>()

// export function CommandRegistryProvider(props: {children: JSX.Element}) {
// 	const [commands, setCommands] = createStore<CommandMap>({})
// 	const navigating = useIsRouting()
// 	createEffect(() => navigating() && setCommands(reconcile({})))
// 	const owner = getOwner()
// 	return (
// 		<CommandRegistryContext.Provider
// 			value={{
// 				commands,
// 				setCommands,
// 				has(id) {
// 					return id in commands && commands[id].id == id
// 				},
// 				resetCommands() {
// 					setCommands(reconcile({}))
// 				},
// 				addCommand(cmd) {
// 					if (cmd.id in commands) {
// 						log(`command ${cmd.id} already exists, overwriting`)
// 					}
// 					log(`registering command ${cmd.id}`)
// 					setCommands({
// 						...commands,
// 						[cmd.id]: cmd,
// 					})
// 				},
// 				exe(id, payload) {
// 					const cmd = commands[id]

// 					if (!cmd) {
// 						log(`tried to run command ${id} but it does not exist`)
// 						return
// 					}
// 					runWithOwner(owner, () => executeCommand(cmd, payload))
// 				},
// 			}}>
// 			{props.children}
// 		</CommandRegistryContext.Provider>
// 	)
// }

// export function useCommandRegistry() {
// 	const cmds = useContext(CommandRegistryContext)
// 	if (!cmds) {
// 		throw new Error(
// 			"useCommandContext must be used within a CommandContextProvider"
// 		)
// 	}
// 	return cmds
// }

// export function useCommand(id: string) {
// 	const commandRegistry = useCommandRegistry()
// 	if (!(id in commandRegistry.commands)) {
// 		log(`tried to run command ${id} but it does not exist`)
// 		return
// 	}
// 	return commandRegistry.commands[id]
// }

// export function registerCommand<T>(cmd: Command<T>) {
// 	const registry = useCommandRegistry()
// 	log(`registering command ${cmd.id}`)
// 	if (cmd.id in registry.commands) {
// 		log(`command ${cmd.id} already exists, overwriting`)
// 	}
// 	registry.setCommands({
// 		...registry.commands,
// 		[cmd.id]: cmd,
// 	})
// }
