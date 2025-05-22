import {createSignal} from "solid-js"
import {makePersisted} from "@solid-primitives/storage"
import {type UserURL} from ":/docs/user-doc.ts"

function forceString<T extends string | null>(string: T) {
	return (string?.[0] == `"` ? JSON.parse(string) : string) as T extends string
		? UserURL
		: null
}
const key = "littlebook:user-id"

const existingUserId = forceString(localStorage.getItem(key))

export function useUserId() {
	const [userId, setUserId] = makePersisted(
		// eslint-disable-next-line solid/reactivity
		createSignal<UserURL | undefined>(existingUserId ?? undefined),
		{
			name: key,
			serialize(string) {
				return string!
			},
			deserialize(string) {
				return forceString(string)
			},
		},
	)

	return [
		userId,
		setUserId,
		() => {
			setUserId(undefined)
			delete globalThis.localStorage[key]
		},
	] as const
}
