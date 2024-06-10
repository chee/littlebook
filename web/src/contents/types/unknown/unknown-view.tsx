import type {ContentView} from "../content-type-registry.ts"

const UnknownView: ContentView<any> = ({content, file}) => {
	return (
		<div style={{display: "flex", height: "100%", background: "#fffefd"}}>
			<ul>
				<li>
					file name: <code>{file.name}</code>
				</li>
				<li>
					content-type: <code>{content.contentType}</code>
				</li>
				<li>
					last-modified: <code>{file.lastModified}</code>
				</li>
			</ul>
		</div>
	)
}

export default UnknownView
