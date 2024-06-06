import {render} from "preact"
import "./style.css"
import {AuthContextProvider} from "./components/auth-provider.tsx"
import Littlebook from "./components/littlebook.tsx"

render(
	<AuthContextProvider>
		<Littlebook />
	</AuthContextProvider>,
	document.getElementById("littlebook")!,
)
