import {Button} from "@kobalte/core/button"
import "./intro.css"
import {useNavigate} from "@solidjs/router"
import {createEffect} from "solid-js"
import {useUserId} from ":/domain/user/user-id.ts"
import {createUser, type UserDoc, type UserURL} from ":/docs/user-doc.ts"
import {toast} from ":/ui/components/toast/toast.tsx"
import {decodeJSON} from ":/core/compress.ts"
import defaultRepo from ":/core/sync/automerge.ts"
import {isValidAutomergeURL} from ":/core/sync/url.ts"

export default function Intro() {
	const nav = useNavigate()
	const [userId, setUserId] = useUserId()
	createEffect(() => {
		if (userId()) {
			return nav("/app")
		}
	})
	const onNewName = (name: string | null) => {
		if (name) {
			setUserId(createUser({name}))
			nav("/app")
		}
	}

	return (
		<article class="intro">
			<div class="intro-card">
				<p>hey..</p>
				<h1>Welcome to Littlebook</h1>
				<p>
					<strong>Have you been here before?</strong>
				</p>
				<div class="intro-card__actions">
					<Button
						class="button"
						onClick={() => {
							const code = prompt(
								"paste the share code you got from your other device",
							)?.trim()
							if (code) {
								const result = decodeJSON<{type: "user"; url: UserURL}>(
									code,
								)
								if (
									result.type == "user" &&
									isValidAutomergeURL(result.url)
								) {
									defaultRepo.find<UserDoc>(result.url).then(h => {
										const d = h.doc()
										if (
											d.type == "user" &&
											isValidAutomergeURL(d.home)
										) {
											setUserId(result.url)
											nav("/app")
										} else {
											toast.show({
												title: "didn't work",
												body: "sorry",
												modifiers: "ohno",
											})
										}
									})
								} else {
									toast.show({
										title: "didn't work",
										body: "sorry",
										modifiers: "ohno",
									})
								}
							}
						}}>
						yes! join existing space 💆‍♀️
					</Button>
					<Button
						class="button"
						onClick={() => {
							onNewName(
								prompt("what's your name? (you can change this later)"),
							)
						}}>
						no! create new space 🌱
					</Button>
				</div>
			</div>
		</article>
	)
}
