import {
	updateText,
	updateBlock,
	updateSpans,
	splitBlock,
	block,
	joinBlock,
	spans,
	splice,
	unmark,
	marksAt,
	getCursor,
	getCursorPosition,
	mark,
	marks,
	getConflicts,
	type Prop,
	type Cursor,
	type MaterializeValue,
	type Span,
	type MarkRange,
	type MarkValue,
	getHeads,
	diff,
	type Heads,
	equals,
	Counter,
} from "@automerge/automerge/next"

type AutomergeBlock = {
	[key: string]: MaterializeValue
}

export function createContentChangeHelpers<ContentType extends lb.AnyContent>(
	content: lb.Content<ContentType>,
) {
	return {
		/**
		 * Update the value of a string
		 * @param path — The path to the string to modify
		 * @param newText — The new text to update the value to
		 * @remarks This will calculate a diff between the current value and the
		 * new value and then convert that diff into calls to splice. This will
		 * produce results which don't merge as well as directly capturing the user
		 * input actions, but sometimes it's not possible to capture user input and
		 * this is the best you can do.
		 * @experimental
		 */
		updateText(path: Prop[], newText: string) {
			return updateText(content, ["value", ...path], newText)
		},
		/** update block marker at index */
		updateBlock(path: Prop[], index: Cursor | number, block: AutomergeBlock) {
			return updateBlock(content, ["value", ...path], index, block)
		},
		/** update span at path */
		updateSpans(path: Prop[], spans: Span[]) {
			return updateSpans(content, ["value", ...path], spans)
		},
		/** insert a new block marker at the given index */
		splitBlock(path: Prop[], index: Cursor | number, block: AutomergeBlock) {
			return splitBlock(content, ["value", ...path], index, block)
		},
		/** delete the block marker at the given index */
		joinBlock(path: Prop[], index: Cursor | number) {
			return joinBlock(content, ["value", ...path], index)
		},
		/** get block marker at index */
		block(path: Prop[], index: Cursor | number) {
			return block(content, ["value", ...path], index)
		},
		/** return the text + block markers at a given path */
		spans(path: Prop[]) {
			return spans(content, ["value", ...path])
		},
		unmark(path: Prop[], range: MarkRange, name: string) {
			return unmark(content, ["value", ...path], range, name)
		},
		mark(path: Prop[], range: MarkRange, name: string, value: MarkValue) {
			return mark(content, ["value", ...path], range, name, value)
		},
		marks(path: Prop[]) {
			return marks(content, ["value", ...path])
		},
		marksAt(path: Prop[], index: number) {
			return marksAt(content, ["value", ...path], index)
		},
		/**
		 *
		 * @param path Modify a string
		 * @param path  The path to the string to modify
		 * @param index The position (as a Cursor or index) to edit. If a cursor
		 *              is used then the edit happens such that the cursor will
		 *              now point to the end of the newText, so you can continue
		 *              to reuse the same cursor for multiple calls to splice.
		 * @param del The number of code units to delete, a positive number
		 *            deletes N characters after the cursor, a negative number
		 *            deletes N characters before the cursor.
		 * @param newText The string to insert (if any). * @param index * @param
		 * del *
		 */
		splice(
			path: Prop[],
			index: Cursor | number,
			del: number,
			newText?: string,
		) {
			return splice(content, ["value", ...path], index, del, newText)
		},
	}
}

export type ContentChangeHelpers<T extends lb.AnyContent> = ReturnType<
	typeof createContentChangeHelpers<T>
>

export function createContentViewHelpers<T extends lb.AnyContent>(
	content: lb.Content<T>,
) {
	return {
		/**
		 * get a cursor for a position
		 *
		 * A cursor represents a relative position, "before character X", rather
		 * than an absolute position. As the document is edited, the cursor
		 * remains stable relative to its context, just as you'd expect from a
		 * cursor in a concurrent text editor. The string representation is
		 * shareable, and so you can use this both to edit the document yourself
		 * (using splice) or to share multiple collaborator's current cursor
		 * positions over the network.
		 */
		getCursor(path: Prop[], index: number) {
			return getCursor(content, ["value", ...path], index)
		},
		/* current index of a cursor */
		getCursorPosition(path: Prop[], cursor: Cursor) {
			return getCursorPosition(content, ["value", ...path], cursor)
		},
		/* conflicts from last change */
		getConflicts() {
			return getConflicts(content, "value")
		},
		getHeads() {
			return getHeads(content)
		},
		diff(before: Heads, after: Heads) {
			return diff(content, before, after)
		},
		equals(a: unknown, b: unknown) {
			return equals(a, b)
		},
		Counter,
	}
}

export type ContentViewHelpers<T extends lb.AnyContent> = ReturnType<
	typeof createContentViewHelpers<T>
>
