export type List<T> = {
	page: number
	perPage: number
	totalItem: number
	items: T[]
}
