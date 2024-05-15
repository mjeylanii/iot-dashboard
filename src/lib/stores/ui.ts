import { writable } from 'svelte/store';

export const alerts = writable([{ id: 0, type: '', message: '', time: new Date() }]);

/*
/ Auth
*/

/**
 * A writable store that holds a user object.
 * @type {import('svelte/store').Writable<User>}
 */
export const user = writable({});

/*
/ Data
*/

export const devices = writable<any>([]);

export const people = writable([{ name: '', status: '', time: new Date() }]);
