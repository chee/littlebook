import {createStore} from "solid-js/store"
// import {useAuth} from "../../automerge/auth/use-automerge.ts"
import {
	getShareId,
	type AuthProvider,
} from "@localfirst/auth-provider-automerge-repo"
import type {DeviceWithSecrets, Team, UserWithSecrets} from "@localfirst/auth"
import type {ParentComponent} from "solid-js"

interface SpaceStateOptions {
	auth: AuthProvider
	user?: UserWithSecrets
	device?: DeviceWithSecrets
	team?: Team
}

export function createSpaceState({user, device, team}: SpaceStateOptions) {
	return createStore({
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
	})
}

export type SpaceState = ReturnType<typeof createSpaceState>

const SpaceStateContext = createContext<SpaceState | null>(null)

export const SpaceStateProvider: ParentComponent<
	Partial<SpaceStateOptions>
> = ({children, ...options}) => {
	const {auth, device, user, team} = useAuth()
	const space = useMemo(
		() =>
			createSpaceState({
				...options,
				auth,
				device,
				user,
				team,
			}),
		[],
	)
	return (
		<SpaceStateContext.Provider value={space}>
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
