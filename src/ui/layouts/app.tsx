/* @refresh reload */
import {RepoContext} from "solid-automerge"
import {type JSXElement} from "solid-js"
import defaultRepo from ":/core/sync/automerge.ts"
import type {Repo} from "@automerge/automerge-repo"
import {ToastRegion} from ":/ui/components/toast/toast.tsx"

export default function AppLayout(props: {children?: JSXElement; repo?: Repo}) {
	return (
		// eslint-disable-next-line solid/reactivity
		<RepoContext.Provider value={props.repo ?? defaultRepo}>
			{props.children}
			<ToastRegion />
		</RepoContext.Provider>
	)
}
