import { writable } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';

/**
 * Represents a person object.
 * @typedef {Object} Person
 * @property {string} name - The name of the person.
 * @property {string} status - The status of the person.
 * @property {Date} time - The time the person was last updated.
 */

/**
 * Represents an alert object.
 * @typedef {Object} Alert
 * @property {string} name - The name of the alert.
 * @property {string} status - The status of the alert.
 * @property {Date} time - The time the alert was triggered.
 */

/**
 * Represents a user object.
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} token - The authentication token of the user.
 */

/*
/ UI
*/

/**
 * A writable store that holds an array of alert objects.
 * @type {import('svelte/store').Writable<Alert[]>}
 */
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

/**
 * A writable store that holds an array of device objects.
 * @type {import('svelte/store').Writable<any[]>}
 */
export const devices = writable<any>([]);

/**
 * A writable store that holds an array of person objects.
 * @type {import('svelte/store').Writable<Person[]>}
 */
export const people = writable([{ name: '', status: '', time: new Date() }]);
