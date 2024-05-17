import { writable } from 'svelte/store';

import type { Alert } from '$lib/types';

export const alerts = writable<Alert[]>([{ id: 0, type: '', message: '', time: new Date() }]);

export const devices = writable<any>([]);

export const people = writable([{ name: '', status: '', time: new Date() }]);

export const showUserPage = writable<boolean>(false);
