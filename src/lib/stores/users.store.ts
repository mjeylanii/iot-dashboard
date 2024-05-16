import { writable } from 'svelte/store';

import type { UsersRecord } from '$lib/types/pocketbase.type';
import type { RecordModel } from 'pocketbase';

export const users = writable<(UsersRecord | RecordModel)[]>([]);
