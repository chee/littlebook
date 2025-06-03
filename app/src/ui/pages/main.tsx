import "./main.css"

import {DropdownMenu} from "@kobalte/core/dropdown-menu"
import activateBasePlugin from ":/plugins/base/base-plugin.ts"
import DockProvider, {Dock} from ":/ui/dock/dock.tsx"
import FileView from ":/ui/components/view/file/fileview"
import DocumentDockTab from ":/ui/dock/components/document-tab"
import Icon from ":/ui/components/icons/icon.tsx"
import {usePluginAPI} from "@littlebook/plugin-api"
import StandaloneViewer from ":/ui/components/view/standalone/standalone-viewer"
import StandaloneViewTab from ":/ui/dock/components/standalone-tab"
import {Workspace} from ":/ui/layouts/workspace/workspace.tsx"

export default function Main() {
	// todo this has nothing to do with UI
	const pluginAPI = usePluginAPI()
	activateBasePlugin(pluginAPI)

	//todo end

	return (
		<div class="main">
			{/* todo there must be a better way */}
			<DockProvider
				components={{
					document(props) {
						return (
							<FileView
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
					<div class="dock-header-actions ui">
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
