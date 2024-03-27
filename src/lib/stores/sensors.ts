import { readable, writable } from 'svelte/store';

export const temperature = writable([{ time: 0, value: 0 }]);

export const humidity = writable([{ time: 0, value: 0 }]);

export const pressure = writable([{ time: 0, value: 0 }]);
