import defaultRepo from ":/core/sync/automerge.ts"
import type {UserDoc} from ":/docs/user-doc.ts"
import {useUserId} from ":/domain/user/user-id.ts"
// import type {DocHandle} from "@automerge/vanillajs/slim"
import {useDocument} from "solid-automerge"
import {createContext, useContext, type Accessor} from "solid-js"

// export function createUser(
// 	doc: Accessor<UserDoc>,
// 	handle: Accessor<DocHandle<UserDoc>>,
// ) {
// 	return {
// 		get url() {
// 			return handle().url
// 		},
// 		get name() {
// 			return doc().name
// 		},
// 		// todo make this a useArea(doc().home, repo)
// 		get home() {
// 			return doc().home
// 		},
// 		get picture() {
// 			return doc().picture
// 		},
// 		get areas() {
// 			return doc().areas
// 		},
// 		get associations() {
// 			return doc().associations
// 		},
// 		get commands() {
// 			return doc().commands
// 		},
// 		get sources() {
// 			return doc().sources
// 		},
// 		get plugins() {
// 			return doc().plugins
// 		},
// 		get views() {
// 			return doc().views
// 		},
// 	}
// }

// todo eventually we need a rich version of this
export function useUserDoc(repo = defaultRepo): Accessor<UserDoc | undefined> {
	const [userId] = useUserId()
	const [user] = useDocument<UserDoc>(userId, {repo})
	return user
}

export const UserDocContext = createContext<Accessor<UserDoc | undefined>>()

export const useUserDocContext = () => {
	const user = useContext(UserDocContext)
	if (!user) {
		throw new Error("useUserContext must be used within a UserProvider")
	}
	return user
}
