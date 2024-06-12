import {signal} from "@preact/signals"
import {createContext, type FunctionalComponent, createRef} from "preact"
import {useContext} from "preact/hooks"
import type {ImperativePanelHandle} from "react-resizable-panels"
import {useAuth} from "../auth/use-auth.ts"
import {
	getShareId,
	type AuthProvider,
} from "@localfirst/auth-provider-automerge-repo"
import type {DeviceWithSecrets, Team, UserWithSecrets} from "@localfirst/auth"
import type {useRouting} from "../routing.ts"

interface SpaceStateOptions {
	auth: AuthProvider
	user?: UserWithSecrets
	device?: DeviceWithSecrets
	team?: Team
}

export function createSpaceState({user, device, team}: SpaceStateOptions) {
	return {
		route: signal<ReturnType<typeof useRouting> | null>(null),
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
		user: {
			name: signal(user?.userName ?? null),
			id: signal(user?.userId ?? null),
		},
		team: {
			id: signal(team?.id ?? null),
			name: signal(team?.teamName ?? null),
		},
		device: {
			id: signal(device?.deviceId ?? null),
			name: signal(device?.deviceName ?? null),
			created: signal(device?.created ?? null),
		},
		space: {
			shareId: signal(team ? getShareId(team) : null),
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

export type SpaceState = ReturnType<typeof createSpaceState>

const SpaceStateContext = createContext<SpaceState | null>(null)

export const SpaceStateProvider: FunctionalComponent<
	Partial<SpaceStateOptions>
> = ({children, ...options}) => {
	const {auth, device, user, team} = useAuth()
	return (
		<SpaceStateContext.Provider
			value={createSpaceState({
				...options,
				auth,
				device,
				user,
				team,
			})}>
			{children}
		</SpaceStateContext.Provider>
	)
}

export function useSpaceState() {
	const ui = useContext(SpaceStateContext)!
	if (!ui) {
		throw new Error("you gotta wrap me in a SpaceContext")
	}
	return ui
}
