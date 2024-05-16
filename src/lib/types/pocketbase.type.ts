/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Messages = "messages",
	Tasks = "tasks",
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

export type MessagesRecord = {
	message?: string
	read?: boolean
	receiver?: RecordIdString[]
	sender?: RecordIdString
}

export enum TasksStatusOptions {
	"INACTIVE" = "INACTIVE",
	"ASSIGNED" = "ASSIGNED",
	"DONE" = "DONE",
}

export enum TasksPriorityOptions {
	"HIGH" = "HIGH",
	"MEDIUM" = "MEDIUM",
	"LOW" = "LOW",
}
export type TasksRecord<Ttags = unknown> = {
	assignedTo?: RecordIdString[]
	description?: string
	dueDate?: IsoDateString
	priority?: TasksPriorityOptions[]
	status?: TasksStatusOptions[]
	tags?: null | Ttags
	title?: string
}

export type UsersRecord = {
	avatar?: string
	bookmarkedTask?: RecordIdString[]
	name?: string
	online?: boolean
	tasks?: RecordIdString[]
}

// Response types include system fields and match responses from the PocketBase API
export type MessagesResponse<Texpand = unknown> = Required<MessagesRecord> & BaseSystemFields<Texpand>
export type TasksResponse<Ttags = unknown, Texpand = unknown> = Required<TasksRecord<Ttags>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	messages: MessagesRecord
	tasks: TasksRecord
	users: UsersRecord
}

export type CollectionResponses = {
	messages: MessagesResponse
	tasks: TasksResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'messages'): RecordService<MessagesResponse>
	collection(idOrName: 'tasks'): RecordService<TasksResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
