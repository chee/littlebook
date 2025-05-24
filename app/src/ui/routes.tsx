// import "solid-devtools/setup"
import {lazy} from "solid-js"
import {render} from "solid-js/web"
import {Route, Router} from "@solidjs/router"
import "./styles/themes/themes.ts"
import AppLayout from ":/ui/layouts/app.tsx"
import "../core/sync/api.ts"

render(
	() => (
		<Router root={AppLayout}>
			<Route path="/" component={lazy(() => import("./pages/intro.tsx"))} />
			<Route component={lazy(() => import("./layouts/logged-in.tsx"))}>
				<Route
					path="/app"
					component={lazy(() => import("./pages/main.tsx"))}
				/>
			</Route>
		</Router>
	),
	document.querySelector("#app")!,
)
