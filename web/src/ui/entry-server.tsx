// @refresh reload
import {StartServer, createHandler} from "@solidjs/start/server"

export default createHandler(() => (
	<StartServer
		document={({assets, children, scripts}) => (
			<html
				lang="en-CA"
				class="has-paper-background h-100"
				style="background: #ffe9ed; background: var(--littlebook-color-paper)">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.svg" />
					{assets}
				</head>
				<body class="flex flex-column grow min-h-100">
					<div id="littlebook" class="flex flex-column grow">
						{children}
					</div>
					{scripts}
				</body>
			</html>
		)}
	/>
))
