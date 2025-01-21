import Resizable, {type ContextValue} from "corvu/resizable"
import LeftSidebar from "../sidebar/left-sidebar.tsx"
import type {ParentComponent, Setter} from "solid-js"
import type {DockviewApi} from "dockview-core"

const Workspace: ParentComponent<{
	sizes: number[]
	setSizes: Setter<number[]>
	setResizableContext: Setter<ContextValue>
	setLastLeftSidebarExpandedSize: Setter<number>
	dockviewAPI: DockviewApi
}> = props => {
	return (
		<section class="workspace">
			<Resizable sizes={props.sizes} onSizesChange={props.setSizes}>
				{() => {
					props.setResizableContext(Resizable.useContext())

					return (
						<>
							<Resizable.Panel
								onResize={size => {
									if (size) {
										props.setLastLeftSidebarExpandedSize(size)
									}
								}}
								initialSize={0.2}
								collapsible={true}
								collapseThreshold={0.2}
								maxSize={0.5}
								collapsedSize={0}>
								<LeftSidebar dockviewAPI={props.dockviewAPI} />
							</Resizable.Panel>
							<Resizable.Handle />
							<Resizable.Panel>{props.children}</Resizable.Panel>
						</>
					)
				}}
			</Resizable>
		</section>
	)
}

export default Workspace
