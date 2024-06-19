import {defineConfig} from "@solidjs/start/config"
import {config as vite} from "./vite.config.ts"
export default defineConfig({
	ssr: false,
	appRoot: "./src/ui",
	routeDir: "./pages",
	vite,
})
