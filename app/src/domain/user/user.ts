import {AreaDoc} from ":/docs/area-doc.ts"
import type {UserDoc} from ":/docs/user-doc.ts"
import {useUserId} from ":/domain/user/user-id.ts"
import usePerfectRepo from ":/lib/sync/useRepo.ts"
import type {DocHandle} from "@automerge/automerge-repo"
// import type {DocHandle} from "@automerge/vanillajs/slim"
import {useDocHandle, useDocument} from "solid-automerge"
import {createContext, createMemo, useContext, type Accessor} from "solid-js"

export function useUserDocument() {
	const [userId] = useUserId()
	const [user, handle] = useDocument<UserDoc>(userId, {repo: usePerfectRepo()})
	return [user, handle] as const
}

export function useUserDoc(): Accessor<UserDoc | undefined> {
	const [user] = useUserDocument()
	return user
}

export const UserContext =
	createContext<
		readonly [
			user: Accessor<UserDoc | undefined>,
			handle: Accessor<DocHandle<UserDoc> | undefined>,
		]
	>()

export const useUserContext = () => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error(
			"useUserContext must be used within a UserContext.Provider",
		)
	}
	return context
}

export const useUserDocContext = () => {
	const [user] = useUserContext()
	return user
}

export const useHomeURL = () => {
	const user = useUserDocContext()
	const home = createMemo(() => user()?.home)
	return home
}

export const useHomeHandle = () => {
	const home = useDocHandle<AreaDoc>(useHomeURL())
	return home
}
