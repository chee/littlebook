import type {AutomergeValue} from "@automerge/automerge/next"
import {useDocument} from "@automerge/automerge-repo-react-hooks"
import {useLittlebookAPI} from "../../hooks/api.ts"
import UnknownView from "../../content-types/unknown/unknown-view.tsx"
import {Component} from "preact"

class ErrorBoundary extends Component {
	state = {error: null}
	static getDerivedStateFromError(error: Error) {
		return {error: error.message}
	}

	componentDidCatch(error: Error) {
		console.error(error)
		this.setState({error: error.message})
	}

	render() {
		if (this.state.error) {
			return (
				<details style={{height: "100%"}}>
					<summary>something went bad :( </summary>
					<pre
						style={{
							background: "black",
							color: "lime",
							padding: "1em",
							display: "flex",
							height: "100%",
						}}>
						<code>{this.state.error}</code>
					</pre>
				</details>
			)
		}
		return this.props.children
	}
}

// todo could be:
//   • ContentDetail
//   • FileViewer
//   • ContentViewer
//   • ContentPane
// but maybe ContentPanel is best
// todo consider making this a web component <content-view/> that simply wraps
// the <ContentManager.contentView/>
export default function ContentPanel({fileId}: {fileId: lb.FileId}) {
	const lb = useLittlebookAPI()
	const [file] = useDocument<lb.File>(fileId)
	if (!file) {
		return <div class="content-pane--loading content-pane--file-loading" />
	}
	const [content, changeContent] = useDocument<lb.Content<AutomergeValue>>(
		file.content,
	)
	if (!content) {
		return <div class="content-pane--loading content-pane--content-loading" />
	}

	const [ContentView] = lb.views.content.get(content.contentType)

	if (!ContentView) {
		return <UnknownView content={content} changeContent={() => {}} />
	}
	return (
		<ErrorBoundary>
			<ContentView content={content} changeContent={changeContent} />
		</ErrorBoundary>
	)
}
