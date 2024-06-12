import type {Repo} from "@automerge/automerge-repo"
import type * as Auth from "@localfirst/auth"
import type {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import {useState} from "preact/hooks"
import {useLocalState} from "../use-local-state.ts"
import {createDefaultTeam} from "../teams/create-team.ts"
import pairDevice from "../devices/pair-device.ts"

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
		<div
			class="hello whats-your-name flex self-center bg-white w-full h-svh sm:max-w-md
		sm:h-auto ring-8 ring-yes-400 p-8 size-48 dark:bg-black dark:text-white">
			<h1 class="size-48">
				hey!
				<span class="size-38">welcome to littlebook.</span>
			</h1>

			<form onSubmit={() => complete(name)}>
				<label class="label" for="hello-name">
					what's your name?
				</label>
				<div class="field has-addons is-size-1">
					<div class="control">
						<input
							id="hello-name"
							class="input"
							type="text"
							placeholder="zoozy"
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
					</div>
					<div class="control">
						<button class="button is-primary" type="submit">
							ok
						</button>
					</div>
				</div>
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
			<p class="is-size-2 mb-3">
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
					<p class="is-size-4 mb-4">
						are you starting fresh, or pairing with another device?
					</p>
					<fieldset
						class="field buttons are-large  is-grouped
					is-flex is-align-items-center
					is-justify-content-space-around is-flex-space-between">
						<button
							class="button is-rounded is-primary"
							type="button"
							onClick={() =>
								createDefaultTeam({
									userName: localState.userName!,
								}).then(complete)
							}>
							start fresh!
						</button>
						<button
							class="button is-link is-rounded"
							type="button"
							onClick={() => setLinking(true)}>
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
