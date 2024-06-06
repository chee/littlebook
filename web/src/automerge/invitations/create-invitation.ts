import type * as Auth from "@localfirst/auth"
import {getShareId} from "@localfirst/auth-provider-automerge-repo"

import * as bip39 from "bip39"
import bs58 from "bs58"

const randbyte = () => Math.floor(Math.random() * 255)

export default function createInvitation(team: Auth.Team, seed: string) {
	const shareId = getShareId(team)
	const shareseed = `${shareId}${seed}`
	const shareseedbytes = bs58.decode(shareseed)
	return bip39.entropyToMnemonic(
		// todo fork bip39 so we don't need these padding bytes
		Buffer.from([...shareseedbytes, randbyte(), randbyte(), randbyte()]),
	)
}
