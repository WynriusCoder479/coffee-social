/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Comments = "comments",
	Communities = "communities",
	Posts = "posts",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CommentsRecord = {
	author?: RecordIdString
	content?: string
	downvotes?: RecordIdString[]
	images?: string[]
	link?: string
	post?: RecordIdString
	upvotes?: RecordIdString[]
}

export type CommunitiesRecord = {
	avatar?: string
	cover?: string
	creator: RecordIdString
	introduction?: string
	name: string
	subscribers?: RecordIdString[]
}

export type PostsRecord = {
	author: RecordIdString
	community: RecordIdString
	content?: string
	downvotes?: RecordIdString[]
	images?: string[]
	link?: string
	title: string
	upvotes?: RecordIdString[]
}

export type UsersRecord = {
	avatar?: string
	avatarUrl?: string
	cover?: string
	firstname?: string
	lastname?: string
	subscriptions?: RecordIdString[]
}

// Response types include system fields and match responses from the PocketBase API
export type CommentsResponse<Texpand = unknown> = Required<CommentsRecord> & BaseSystemFields<Texpand>
export type CommunitiesResponse<Texpand = unknown> = Required<CommunitiesRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	comments: CommentsRecord
	communities: CommunitiesRecord
	posts: PostsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	comments: CommentsResponse
	communities: CommunitiesResponse
	posts: PostsResponse
	users: UsersResponse
}