export default abstract class Store<DataType> implements lb.Store<DataType> {
	abstract sub(listener: () => void): () => void
	abstract get(): DataType
	abstract set(local: DataType): void
}
