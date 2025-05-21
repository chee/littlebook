import {AutomergeUrl, isValidAutomergeUrl} from "@automerge/vanillajs"
import * as v from "valibot"
export const automergeURL = v.custom<AutomergeUrl>(isValidAutomergeUrl)
