import type { CommunitiesResponse, List, UsersResponse } from '$lib/types'
import { http } from './axios'

export const getUserSubscriptions = async ({
	userId,
	page = 1
}: {
	userId: string
	page: number
}) => {
	const { data } = await http.get<{
		communities: List<CommunitiesResponse<{ creator: UsersResponse }>>
		next: string
	}>(`/communities/subscriptions/${userId}?page=${page}`)

	return data
}

export const getCommunitySubscribers = async ({
	communityId,
	page = 1
}: {
	communityId: string
	page: number
}) => {
	const { data } = await http.get<{
		subscribers: List<UsersResponse>
		next: string
	}>(`/communities/subscribers/${communityId}?page=${page}`)

	return data
}
