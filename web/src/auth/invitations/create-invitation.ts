import type * as Auth from "@localfirst/auth"
import {getShareId} from "@localfirst/auth-provider-automerge-repo"

// import * as bip39 from "bip39"
// import bs58 from "bs58"
import type {BasicInvitation} from "./invitation-types.ts"

// const randbyte = () => Math.floor(Math.random() * 255)

// export default function createFriendlyInvitation(
// 	team: Auth.Team,
// 	seed: string,
// ) {
// 	const shareseed = createBasicInvitation(team, seed)
// 	const shareseedbytes = bs58.decode(shareseed)

// 	const paddedLength = 4 * Math.ceil(shareseedbytes.byteLength / 4)
// 	// todo fork bip39 so we don't need these padding bytes
// 	const paddedSeed = new Uint8Array(
// 		Uint8Array.from([...shareseedbytes, randbyte(), randbyte(), randbyte()]),
// 		0,
// 		paddedLength,
// 	)
// 	const invitation = (bip39.entropyToMnemonic(Buffer.from(paddedSeed)) +
// 		" " +
// 		shareseedbytes.length) as FriendlyInvitation

// 	return invitation
// }

export function createBasicInvitation(team: Auth.Team, seed: string) {
	const shareId = getShareId(team)
	const shareseed = `${shareId}${seed}`
	return shareseed as BasicInvitation
}
