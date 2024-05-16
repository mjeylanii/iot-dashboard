import type { TypedPocketBase, UsersResponse } from '$lib/types/pocketbase.type';
import type { Alert, PersonsAPIType } from '$types';
import type PocketBase from 'pocketbase';

import { alerts, users } from '$stores';

export default class PersonsAPI implements PersonsAPIType {
	private pocketbase: TypedPocketBase;
	constructor(pocketbase: PocketBase) {
		this.pocketbase = pocketbase;
	}

	public async getPersons(): Promise<UsersResponse[]> {
		try {
			const res = await this.pocketbase.collection('users').getFullList();

			return res;
		} catch (err) {
			alerts.update((alerts: Alert[]) => [
				...alerts,
				{
					id: alerts.length++,
					type: 'error',
					message: 'Error fetching personnel data from the database',
					time: new Date(),
				},
			]);

			throw new Error('Error fetching personnel data from the database');
		}
	}

	public async getPerson(id: string): Promise<UsersResponse> {
		try {
			const res = await this.pocketbase.collection('users').getOne(id);
			return res;
		} catch (err) {
			alerts.update((alerts: Alert[]) => [
				...alerts,
				{
					id: alerts.length++,
					type: 'error',
					message: 'Error fetching personnel data from the database',
					time: new Date(),
				},
			]);
			throw new Error('Error fetching personnel data from the database');
		}
	}

	public async createPerson(formData: FormData): Promise<UsersResponse> {
		try {
			const res = await this.pocketbase.collection('users').create(formData);

			if (!res) {
				alerts.update((alerts: Alert[]) => [
					...alerts,
					{
						id: alerts.length++,
						type: 'error',
						message: 'Error adding personnel. Check if already exists',
						time: new Date(),
					},
				]);
				throw new Error('Error adding personnel to the database');
			}

			users.update((users) => [...users, res]);

			alerts.update((alerts: Alert[]) => [
				...alerts,
				{
					id: alerts.length++,
					type: 'success',
					message: 'Personnel added successfully',
					time: new Date(),
				},
			]);

			return res;
		} catch (err) {
			alerts.update((alerts: Alert[]) => [
				...alerts,
				{
					id: alerts.length++,
					type: 'error',
					message: 'Error adding personnel. Check if already exists',
					time: new Date(),
				},
			]);

			throw new Error('Error adding personnel to the database');
		}
	}

	public async updatePerson(id: string, formData: FormData): Promise<UsersResponse> {
		try {
			const res = await this.pocketbase.collection('users').update(id, formData);

			return res;
		} catch (err) {
			throw new Error('Error updating personnel in the database');
		}
	}

	public async deletePerson(id: string): Promise<void> {
		try {
			await this.pocketbase.collection('users').delete(id);

			users.update((users) => users.filter((user) => user.id !== id));
		} catch (err) {
			alerts.update((alerts: Alert[]) => [
				...alerts,
				{
					id: alerts.length++,
					type: 'error',
					message: 'Error deleting personnel from the database',
					time: new Date(),
				},
			]);
			throw new Error('Error deleting personnel from the database');
		}
	}

	public subscribeToPersons() {
		try {
			const res = this.pocketbase
				.collection('users')
				.subscribe('*', (e) => users.update((users) => [...users, e.record]));
			return res;
		} catch (err) {
			throw new Error('Error fetching users data from the database');
		}
	}

	public checkOnline() {
		const res = this.pocketbase.authStore.isValid;
		console.log(res);
		return res;
	}
}
