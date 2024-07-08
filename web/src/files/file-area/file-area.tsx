import ContentViewer from "../content-viewer/content-viewer.tsx"
import useDocument from "../../documents/use-document.ts"
import {Suspense, type JSXElement} from "solid-js"

import "./file-area.scss"
type FileAreaProps = {
	fileId?: lb.FileId
	headerItems?: {
		left?: JSXElement
		right?: JSXElement
	}
}
export default function FileArea(props: FileAreaProps) {
	const [file, _change] = useDocument<lb.File>(() => props.fileId)

	// todo file pane menu

	return (
		<Suspense>
			<div class="file-viewer">
				<header class="file-viewer-head headstrip">
					<div class="file-viewer-head-left headstrip-left">
						{props.headerItems?.left}
					</div>
					<div class="file-viewer-head-middle headstrip-middle">
						<div class="file-viewer-head-file-name">
							<span class="file-viewer-head-file-icon">
								{file.latest?.icon}
							</span>
							<span class="file-viewer-head-file-name__name">
								{file.latest?.name}
							</span>
						</div>
					</div>
					<div class="file-viewer-head-right headstrip-right">
						<button type="button" onclick={() => {}}>
							...
						</button>

						{props.headerItems?.right}
					</div>
				</header>
				<div class="file-viewer-body" style={{width: "100%"}}>
					<Suspense>
						<ContentViewer fileId={props.fileId} />
					</Suspense>
				</div>
			</div>
		</Suspense>
	)
}
