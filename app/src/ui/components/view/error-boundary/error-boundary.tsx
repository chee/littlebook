import "./error-boundary.css"
import type {FileEntryDoc} from ":/docs/file-entry-doc.ts"
import type {View} from "@littlebook/plugin-api/types/view.ts"
import {createEffect, ErrorBoundary, type JSX} from "solid-js"

export default function ViewErrorBoundary(props: {
	children: JSX.Element
	view: View | undefined
	entry?: FileEntryDoc | undefined
	content?: unknown
}) {
	return (
		<ErrorBoundary
			fallback={(error, reset) => {
				createEffect(again => {
					if (props.view && again) reset()
					return true
				})
				console.error(error, props.entry, props.view, props.content)
				return <div class="fileview__error-boundary"></div>
			}}>
			{props.children}
		</ErrorBoundary>
	)
}
