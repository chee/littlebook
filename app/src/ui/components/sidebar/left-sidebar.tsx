import {Show} from "solid-js"
import "./sidebar.css"
import DocumentListWidget from "./document-list/document-list-widget.tsx"
import {useUserDocContext} from ":/domain/user/user.ts"
import {useDocument} from "solid-automerge"
import {createFileEntry} from ":/docs/file-entry-doc.ts"
import {AreaDoc} from ":/docs/area-doc.ts"

export default function Sidebar(props: {collapse(): void}) {
	// todo add pinned directories
	const user = useUserDocContext()
	const homeEntryURL = () => user()?.home
	// todo changes in the area rich model
	const [home, handle] = useDocument<AreaDoc>(homeEntryURL())
	return (
		<aside class="sidebar sidebar--left">
			<div class="sidebar-widgets">
				<Show when={home()}>
					<DocumentListWidget
						area={home()!}
						createFile={template => {
							const url = createFileEntry(template)
							// todo home.createFile(template)
							handle()?.change(doc => {
								if (!doc.files.includes(url)) {
									doc.files.push(url)
								}
							})
							return url
						}}
					/>
				</Show>
			</div>
			<footer class="sidebar-footer"></footer>
		</aside>
	)
}
