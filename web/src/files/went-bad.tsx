export default function SomethingWentWrong({error}: {error: Error}) {
	return (
		<details class="flex column h-100">
			<summary>something went bad :( </summary>
			<div
				style={{
					background: "black",
					color: "lime",
					padding: "1em",
					// display: "flex",
					// "flex-direction": "column",
					height: "100%",
				}}>
				<pre>
					<code>{error.message}</code>
				</pre>
				<pre>
					<code>{JSON.stringify(error)}</code>
				</pre>
				<pre>
					<code>{error.stack}</code>
				</pre>
			</div>
		</details>
	)
}
