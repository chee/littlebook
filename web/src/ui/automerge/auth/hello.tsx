import type {Repo} from "@automerge/automerge-repo"
import type * as Auth from "@localfirst/auth"
import type {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
// import {useState} from "preact/hooks"
import {useLocalAuthState} from "./local.ts"
import {
	createDefaultTeam,
	type CreateDefaultTeamOptions,
} from "../../../auth/teams/create-team.ts"
import pairDevice, {
	type PairDeviceOptions,
} from "../../../auth/devices/pair-device.ts"
import {createSignal} from "solid-js"
import * as local from "./local.ts"

type HelloProps = {
	pair(opts: PairDeviceOptions): void
	fresh(opts: CreateDefaultTeamOptions): void
}

export const Hello = (props: HelloProps) => {
	if (!local.state.username) {
		return <WhatsYourName complete={username => local.set({username})} />
	}

	return <FreshOrFriend pair={props.pair} fresh={props.fresh} />
}

function WhatsYourName({complete}: {complete: (n: string) => void}) {
	const [name, setName] = createSignal("")
	return (
		<div>
			<h1>
				hey!
				<span style="font-size: 0.8em">welcome to littlebook.</span>
			</h1>

			<form onSubmit={() => complete(name())}>
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
							value={name()}
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

function FreshOrFriend({pair, fresh}: HelloProps) {
	const [linking, setLinking] = createSignal(false)
	const [invite, setInvite] = createSignal("")
	return (
		<div class="hello fresh-or-friend">
			<p class="is-size-2 mb-3">
				hello, <span class="hello-hl">{local.state.username!}</span>!!!
			</p>
			<label>
				wrong name?{" "}
				<button type="button" onClick={() => local.set(() => ({}))}>
					click here to start again
				</button>
			</label>
			{linking() ? (
				<>
					<p>ok! cool! what's your invite phrase?</p>
					<form
						onSubmit={event => {
							event.preventDefault()
							pair({
								username: local.state.username!,
								invitationCode: invite(),
							})
						}}>
						<fieldset>
							<span>&gt; </span>
							<input
								id="name"
								autofocus
								value={invite()}
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
								fresh({
									username: local.state.username!,
								})
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
