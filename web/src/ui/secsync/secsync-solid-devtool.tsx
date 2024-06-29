// https://github.com/serenity-kit/secsync/blob/main/packages/secsync-react-devtool/src/DevTool.tsx
import type {Context} from "secsync"
import {For, type ParentComponent} from "solid-js"

type State = {
	value: any
	context: Context
}

type Props = {
	state: State
	send: (params: any) => void
}

const Section: ParentComponent = ({children}) => (
	<div style={{padding: "12px 20px", flex: "1 1 0px"}}>{children}</div>
)

const SectionLabel: ParentComponent = ({children}) => {
	return (
		<div
			style={{
				"font-size": "14px",
				color: "black",
				"margin-top": "12px",
				"font-weight": "bold",
			}}>
			{children}
		</div>
	)
}

const Label: ParentComponent = ({children}) => {
	return (
		<div
			style={{
				"font-size": "12px",
				color: "gray",
				"margin-top": "12px",
			}}>
			{children}
		</div>
	)
}

export const DevTool: ParentComponent<Props> = ({state, send}) => {
	const isOnline = Object.prototype.hasOwnProperty.call(
		state.value,
		"connected",
	)

	return (
		<div
			style={{
				border: "1px solid #ddd",
				background: "#fafafa",
				"padding-bottom": "12px",
			}}>
			<div style={{display: "flex"}}>
				<Section>
					<SectionLabel>Connection</SectionLabel>
					<div>
						<Label>Status</Label>
						<div>
							<span style={{color: isOnline ? "green" : "red"}}>•</span>
							{isOnline ? "Online" : "Offline"}
						</div>
					</div>
					<div>
						<Label>Connecting retries</Label>
						<div>{state.context._websocketRetries}</div>
					</div>
					<div>
						<Label>Actions</Label>
						<div>
							<button
								type="button"
								onClick={event => {
									event.preventDefault()
									send({type: "CONNECT"})
								}}
								disabled={isOnline || state.value === "failed"}
								style={{
									background: "#fff",
									padding: "4px 8px",
									border: "1px solid #ccc",
									"border-radius": "8px",
									"margin-right": "8px",
									"margin-top": "4px",
									opacity: isOnline || state.value === "failed" ? 0.5 : 1,
								}}>
								Connect
							</button>
							<button
								type="button"
								onClick={event => {
									event.preventDefault()
									send({type: "DISCONNECT"})
								}}
								disabled={!isOnline}
								style={{
									background: "#fff",
									padding: "4px 8px",
									border: "1px solid #ccc",
									"border-radius": "8px",
									"margin-right": "8px",
									"margin-top": "4px",
									opacity: !isOnline ? 0.5 : 1,
								}}>
								Disconnect
							</button>
						</div>
					</div>
				</Section>

				<Section>
					<SectionLabel>Document status</SectionLabel>
					<div>
						<Label>Status</Label>
						<div>{state.value === "failed" ? "❌ failed" : "valid"}</div>
					</div>
					<div>
						<Label>Initial document loading (incl. decryption)</Label>
						<div>{state.context._documentDecryptionState}</div>
					</div>
				</Section>
			</div>

			<div style={{display: "flex"}}>
				<Section>
					<SectionLabel>Errors</SectionLabel>
					{/* TODO add a timestamp when the error happened */}
					<div>
						<Label>Document errors</Label>
						<div>
							{state.context._snapshotAndUpdateErrors.length === 0 ? (
								"No Errors"
							) : (
								<ul>
									<For each={state.context._snapshotAndUpdateErrors}>
										{error => <li>{error.message}</li>}
									</For>
								</ul>
							)}
						</div>
					</div>

					<div>
						<Label>Incoming EphemeralMessage errors</Label>
						<div>
							{state.context._ephemeralMessageReceivingErrors.length === 0 ? (
								"No Errors"
							) : (
								<ul>
									<For each={state.context._ephemeralMessageReceivingErrors}>
										{error => <li>{error.message}</li>}
									</For>
								</ul>
							)}
						</div>
					</div>

					<div>
						<Label>Sending EphemeralMessage errors</Label>
						<div>
							{state.context._ephemeralMessageAuthoringErrors.length === 0 ? (
								"No Errors"
							) : (
								<ul>
									<For each={state.context._ephemeralMessageAuthoringErrors}>
										{error => <li>{error.message}</li>}
									</For>
								</ul>
							)}
						</div>
					</div>
				</Section>

				<Section>
					<SectionLabel>Data sending in progress</SectionLabel>
					<div>
						<Label>Sending Snapshot in progress</Label>
						<div>{state.context._snapshotInFlight ? "true" : "false"}</div>
					</div>

					<div>
						<Label>Sending updates in progress</Label>
						<div>{state.context._updatesInFlight.length}</div>
					</div>
				</Section>
			</div>
		</div>
	)
}
