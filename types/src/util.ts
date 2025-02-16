import {AutomergeUrl, isValidAutomergeUrl} from "@automerge/automerge-repo"
import * as v from "valibot"

export type MaybePromise<T> = T | Promise<T>

export const automergeURL = v.custom<AutomergeUrl>(isValidAutomergeUrl)
