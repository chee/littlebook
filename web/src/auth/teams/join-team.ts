// todo
//import createRepo from "./create-repo.ts"

// export default async function joinTeam({userName, device, }) {
// 	const {user, device} = getUserAndDevice()
// 	const {auth, repo} = await createRepo({user, device})

// 	const {shareId, invitationSeed} = parseInvitationCode(invitationCode)
// 	auth.addInvitation({shareId, invitationSeed, userName})

// 	// Once we're admitted, we'll get the Team data and our User object
// 	auth.once("joined", ({team, user}) => {
// 		// Now we have our real userId, we can update the device
// 		device.userId = user.userId

// 		onSetup({device, user, team, auth, repo})
// 	})
// }
