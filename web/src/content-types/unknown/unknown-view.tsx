import type {ContentView, ContentViewProps} from "../content-type-registry.ts"

// todo should these also get the File?
const UnknownView: ContentView<any> = ({
	content,
}: Pick<ContentViewProps<any>, "content">) => {
	return (
		<div style={{display: "flex", height: "100%", background: "#fffefd"}}>
			<ul>
				<li>
					ContentType: <code>{content.contentType}</code>
				</li>
			</ul>
		</div>
	)
}

export default UnknownView
