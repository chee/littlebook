import "./main.css"
import {createEffect} from "solid-js"

import {DropdownMenu} from "@kobalte/core/dropdown-menu"
import activateBasePlugin from ":/plugins/base/base-plugin.ts"
import {useUserDocContext} from ":/domain/user/user.ts"
import DockProvider, {Dock} from ":/ui/dock/dock.tsx"
import FileViewer from ":/ui/components/file-viewer/file-viewer.tsx"
import DocumentDockTab from ":/ui/dock/components/document-tab"
import Icon from ":/ui/components/icons/icon.tsx"
import {usePluginAPI} from "@littlebook/plugin-api"
import {useSourceRegistry} from "@littlebook/plugin-api/registries/source-registry.ts"
import {useViewRegistry} from "@littlebook/plugin-api/registries/view-registry.ts"
import StandaloneViewer from ":/ui/components/file-viewer/standalone-viewer.tsx"
import StandaloneViewTab from ":/ui/dock/components/standalone-tab"
import {Workspace} from ":/ui/layouts/workspace/workspace.tsx"

export default function Main() {
	// todo this has nothing to do with UI
	const pluginAPI = usePluginAPI()
	activateBasePlugin(pluginAPI)
	const user = useUserDocContext()
	const sourceRegistry = useSourceRegistry()
	const viewRegistry = useViewRegistry()

	createEffect(() => {
		for (const sourceURL of user()?.sources ?? []) {
			sourceRegistry.maybe(sourceURL)
		}
		for (const viewURL of user()?.views ?? []) {
			viewRegistry.maybe(viewURL)
		}
	})
	//todo end

	return (
		<div class="main">
			{/* todo there must be a better way */}
			<DockProvider
				components={{
					document(props) {
						return (
							<FileViewer
								url={props.id}
								isActive={props.dockAPI.activePanelID == props.id}
							/>
						)
					},
					standalone(props) {
						return (
							<StandaloneViewer
								id={props.id.split(":")[1]}
								isActive={props.dockAPI.activePanelID == props.id}
							/>
						)
					},
				}}
				tabComponents={{
					document(props) {
						return <DocumentDockTab url={props.id} />
					},
					standalone(props) {
						return <StandaloneViewTab id={props.id} />
					},
				}}
				watermarkComponent={() => <div class="dock-watermark" />}
				rightHeaderActionComponent={props => (
					<div class="dock-header-actions">
						<DropdownMenu>
							<DropdownMenu.Trigger
								class="popmenu__trigger popmenu__trigger--dock-header  dock-header-actions__button"
								aria-label="more actions">
								<Icon name="menu-dots-bold" inline />
							</DropdownMenu.Trigger>
							<DropdownMenu.Portal>
								<DropdownMenu.Content class="popmenu__content">
									<DropdownMenu.Item
										class="popmenu__item"
										onSelect={() =>
											props.dockAPI.closeGroup(props.groupID)
										}>
										Close Group
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu>
					</div>
				)}>
				<Workspace>
					<Dock />
				</Workspace>
			</DockProvider>
		</div>
	)
}
