import {type Transaction, Annotation} from "@codemirror/state"

export const reconcileAnnotationType = Annotation.define<unknown>()
export default reconcileAnnotationType

export const isReconcileTx = (tr: Transaction): boolean =>
	!!tr.annotation(reconcileAnnotationType)
