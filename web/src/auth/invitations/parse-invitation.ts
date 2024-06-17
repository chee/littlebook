import type * as Auth from "@localfirst/auth"
import type {ShareId} from "@localfirst/auth-provider-automerge-repo"

// import * as bip39 from "bip39"
// import bs58 from "bs58"
import type {BasicInvitation, FriendlyInvitation} from "./invitation-types.ts"

function* chunks<T extends Array<any>>(arr: T, n: number) {
	for (let i = 0; i < arr.length; i += n) {
		yield Number.parseInt(arr.slice(i, i + n).join(""), 16)
	}
}
export function parseBasicInvitation(invitation: BasicInvitation) {
	const shareId = invitation.slice(0, 12) as ShareId
	const invitationSeed = invitation.slice(12) as Auth.Base58
	return {shareId, invitationSeed}
}

export default function parseFriendlyInvitation(
	invitation: FriendlyInvitation,
) {
	const invite = invitation.trim()
	const match = invite.match(/(.*) (\d+)/)
	if (!match) {
		throw new Error(`bad invitation: ${invitation}`)
	}
	const [, mnemonic, length] = match
	const ssb = bip39.mnemonicToEntropy(mnemonic)
	const bytes = Uint8Array.from(chunks(ssb.split(""), 2))
	// minus the 3 random bytes added for padding
	const invitationCode = bs58.encode(bytes.slice(0, +length))

	return parseBasicInvitation(invitationCode as BasicInvitation)
}
