import {AutomergeUrl} from "@automerge/automerge-repo"
import {AutomergeValue} from "@automerge/automerge"

declare global {
	namespace pointplace {
		type ref<T extends Record<string, AutomergeValue>> = AutomergeUrl & {
			type: T
		}

		// todo do i need a ResolvedDocument too?
		interface document<Type extends pointplace.type> {
			name: string
			shape: ref<Type>
			importer: ref<importer<Type>>
			content: ref<Type>
		}

		interface importer<Type extends pointplace.type> {
			import(bytes: Uint8Array): Type["shape"]
			shape: ref<Type>
		}

		interface raw {
			name: string
			bytes: Uint8Array
		}

		interface type<T> {
			name: string
			shape: T
		}
	}
}
