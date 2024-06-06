import type {Repo} from "@automerge/automerge-repo"
import type * as Auth from "@localfirst/auth"
import type {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import {useState} from "preact/hooks"
import {useLocalState} from "../../hooks/local-state.ts"
import "./hello.css"
import {createDefaultTeam} from "../../automerge/teams/create-team.ts"
import pairDevice from "../../automerge/devices/pair-device.ts"

export const Hello = ({complete}: {complete: OnComplete}) => {
	const localState = useLocalState()

	if (!localState.userName) {
		return (
			<WhatsYourName
				complete={name => localState.updateLocalState({userName: name})}
			/>
		)
	}

	return <FreshOrFriend complete={complete} />
}

function WhatsYourName({complete}: {complete: (n: string) => void}) {
	const [name, setName] = useState("")
	return (
		<div class="hello whats-your-name">
			<p>hey! welcome to littlebook</p>
			<form onSubmit={() => complete(name)}>
				<label for="name">
					what's your name?
					<br />
				</label>
				<fieldset>
					<span>&gt; </span>
					<input
						id="name"
						autofocus
						value={name}
						onInput={event =>
							setName(
								event.target instanceof HTMLInputElement
									? event.target.value
									: "",
							)
						}
					/>
					<button type="submit">ok</button>
				</fieldset>
			</form>
		</div>
	)
}

function FreshOrFriend({complete}: {complete: OnComplete}) {
	const localState = useLocalState()
	const [linking, setLinking] = useState(false)
	const [invite, setInvite] = useState("")
	return (
		<div class="hello fresh-or-friend">
			<p>
				hello, <span class="hello-hl">{localState.userName!}</span>!!!
			</p>
			{linking ? (
				<>
					<p>ok! cool! what's your invite phrase?</p>
					<form
						onSubmit={event => {
							event.preventDefault()
							pairDevice({
								userName: localState.userName!,
								invitationCode: invite,
							}).then(complete)
						}}>
						<fieldset>
							<span>&gt; </span>
							<input
								id="name"
								autofocus
								value={invite}
								onInput={event =>
									setInvite(
										event.target instanceof HTMLInputElement
											? event.target.value
											: "",
									)
								}
							/>
							<button type="submit">ok</button>
						</fieldset>
					</form>
					<p>
						<small>
							(you can get it from your other device by selecting "add a new
							device" from the <span class="dotdotdot">...</span> menu at the
							top right or go{" "}
							<button
								type="button"
								class="oops"
								onClick={() => setLinking(false)}>
								back
							</button>{" "}
							if you came here by mistake)
						</small>
					</p>
				</>
			) : (
				<>
					{" "}
					<p>are you starting fresh, or linking up to a new device?</p>
					<fieldset>
						<button
							type="button"
							onClick={() =>
								createDefaultTeam({
									userName: localState.userName!,
								}).then(complete)
							}>
							start fresh!
						</button>
						<button type="button" onClick={() => setLinking(true)}>
							link device!
						</button>
					</fieldset>
				</>
			)}
		</div>
	)
}

export type OnComplete = (args: {
	user: Auth.UserWithSecrets
	device: Auth.DeviceWithSecrets
	team: Auth.Team
	auth: AuthProvider
	repo: Repo
}) => void
