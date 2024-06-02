import {useRouteError} from "react-router-dom"

export default function ErrorPage() {
	const error = useRouteError() as {statusText?: string; message?: string}
	console.error(error)

	return (
		<div id="error">
			<h1>sorry</h1>
			<p>i couldnt</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	)
}
