import type {AutomergeValue} from "@automerge/automerge/next"
import {useDocument} from "@automerge/automerge-repo-react-hooks"
import {useLittlebookAPI} from "../littlebook-api/use-littlebook.ts"
import UnknownView from "./types/unknown/unknown-view.tsx"
import {Component} from "preact"

// todo could be:
//   • ContentDetail
//   • FileViewer
//   • ContentViewer
//   • ContentPane
// but maybe ContentPanel is best
// todo consider making this a web component <content-view/> that simply wraps
// the <ContentManager.contentView/>
export default class ContentViewer extends Component<{fileId: lb.FileId}> {
	state = {error: null}
	static getDerivedStateFromError(error: Error) {
		return {error: error.message}
	}
	componentDidCatch(error: Error) {
		console.error(error)
		this.setState({error: error.message})
	}
	error() {
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

	render() {
		if (this.state.error) return this.error()
		const lb = useLittlebookAPI()
		const [file] = useDocument<lb.File>(this.props.fileId)
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
		return <ContentView content={content} changeContent={changeContent} />
	}
}
