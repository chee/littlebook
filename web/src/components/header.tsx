import createDeviceInvitation from "../automerge/invitations/create-device-invitation.ts"
import {useAuth} from "../hooks/auth.ts"

export default function Header() {
	const {team} = useAuth()

	return (
		<button
			type="button"
			onClick={() =>
				window.prompt(
					"copy this to your other device",
					createDeviceInvitation(team),
				)
			}>
			...
		</button>
	)
}
