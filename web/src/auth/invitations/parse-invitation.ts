import type * as Auth from "@localfirst/auth"
import type {ShareId} from "@localfirst/auth-provider-automerge-repo"
import type {BasicInvitation} from "./invitation-types.ts"
export function parseBasicInvitation(invitation: BasicInvitation) {
	const shareId = invitation.slice(0, 12) as ShareId
	const invitationSeed = invitation.slice(12) as Auth.Base58
	return {shareId, invitationSeed}
}
