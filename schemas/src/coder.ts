import {
	any,
	args,
	array,
	awaitAsync,
	function_,
	instance,
	object,
	optional,
	parse,
	pipe,
	pipeAsync,
	promise,
	returns,
	returnsAsync,
	string,
	tuple,
	unknown,
	type BaseIssue,
	type BaseSchema,
	type InferDefault,
	type InferInput,
	type InferOutput,
	type LooseObjectSchema,
	type ObjectSchema,
} from "valibot"
import {result, stored} from "./util.js"

export const CoderMetadata = object({
	id: string(),
	displayName: string(),
	contentType: string(),
	plugin: optional(string()),
	mimeTypes: optional(array(string())),
	filePatterns: optional(array(string())),
	recommendedFileExtension: optional(string()),
})

export type CoderMetadata = InferOutput<typeof CoderMetadata>

export function inferCoder<T extends BaseSchema<any, any, any>>(schema: T) {
	return object({
		fromBytes: pipe(
			function_(),
			args(tuple([instance(Uint8Array)])),
			returns(result(schema))
		),
		toBytes: pipe(
			function_(),
			args(tuple([schema])),
			returns(result(instance(Uint8Array)))
		),
		fromFile: pipe(
			function_(),
			args(tuple([instance(File)])),
			returnsAsync(pipeAsync(promise(), awaitAsync(), result(schema)))
		),
		new: pipe(function_(), returns(schema)),
		...CoderMetadata.entries,
	})
}

export const Coder = inferCoder(unknown()) as BaseSchema<
	Coder,
	Coder,
	BaseIssue<unknown>
>

export type Coder<
	T extends BaseSchema<any, any, any> = BaseSchema<any, any, any>,
> = InferOutput<ReturnType<typeof inferCoder<T>>>

export const StoredCoder = stored("coder", CoderMetadata.entries)

export type StoredCoder = InferOutput<typeof StoredCoder>
