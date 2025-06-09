/* @refresh reload */
import "./app.css"
import {RepoContext} from "solid-automerge"
import {Show, type JSXElement} from "solid-js"
import defaultRepo from ":/core/sync/automerge.ts"
import type {Repo} from "@automerge/automerge-repo"
import {ToastRegion} from ":/ui/components/toast/toast.tsx"

export default function AppLayout(props: {children?: JSXElement; repo?: Repo}) {
	return (
		// eslint-disable-next-line solid/reactivity
		<RepoContext.Provider value={props.repo ?? defaultRepo}>
			<Show when={import.meta.env.PROD}>
				<header class="early-warning">
					This is alpha quality software. All features will change. All
					data will be lost.
				</header>
			</Show>
			{props.children}
			<ToastRegion />
		</RepoContext.Provider>
	)
}
