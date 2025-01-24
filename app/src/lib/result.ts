// export {ok, err, Ok, Err, Result} from "neverthrow"
export {ok, err} from "true-myth/result"
export type {Ok, Err, Result} from "true-myth/result"

// export type Ok<T> = {ok: true; val: T}
// export type Err = {ok: false; err: Error}
// export type Result<T> = Ok<T> | Err
// export function ok<T>(val?: T): Result<T> {
// 	return {ok: true, val}
// }

// export function err<T = unknown>(err: Error): Result<T> {
// 	return {ok: false, err}
// }
