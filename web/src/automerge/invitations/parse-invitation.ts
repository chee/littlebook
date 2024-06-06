import type * as Auth from "@localfirst/auth"
import type {ShareId} from "@localfirst/auth-provider-automerge-repo"

import * as bip39 from "bip39"
import bs58 from "bs58"

function* chunks<T extends Array<any>>(arr: T, n: number) {
	for (let i = 0; i < arr.length; i += n) {
		yield Number.parseInt(arr.slice(i, i + n).join(""), 16)
	}
}

export default function parseInvitation(mnemonic: string) {
	const ssb = bip39.mnemonicToEntropy(mnemonic)
	const bytes = Uint8Array.from(chunks(ssb.split(""), 2))
	// minus the 3 random bytes added for padding
	const invitationCode = bs58.encode(bytes.slice(0, -3))
	const shareId = invitationCode.slice(0, 12) as ShareId
	const invitationSeed = invitationCode.slice(12) as Auth.Base58
	return {shareId, invitationSeed}
}
