import type { UsersRecord } from '$lib/types/pocketbase.types';
import type { AdminAuthResponse } from 'pocketbase';
import type PocketBase from 'pocketbase';

export class AuthAPI {
	private pocketbase: PocketBase;
	constructor(pocketbase: PocketBase) {
		this.pocketbase = pocketbase;
	}

	public async logIn(email: string, password: string): Promise<AdminAuthResponse> {
		try {
			const res = await this.pocketbase.admins.authWithPassword(email, password);

			return res;
		} catch (err) {
			throw new Error('Error authenticating with the database');
		}
	}

	public async logOut() {
		try {
			const res = this.pocketbase.authStore.clear();

			return res;
		} catch (err) {
			throw new Error('Error logging out');
		}
	}

	public async updateUserPassword(id: string, newPassword: FormData): Promise<UsersRecord> {
		try {
			const res = await this.pocketbase.collection('users').update<UsersRecord>(id, newPassword);

			return res;
		} catch (err) {
			throw new Error('Error updating user password');
		}
	}

	public async resetPassword(email: string): Promise<boolean> {
		try {
			const res = await this.pocketbase.admins.requestPasswordReset(email);

			console.log(res);

			return res;
		} catch (err) {
			throw new Error('Error resetting password');
		}
	}

	public async checkIfLoggedIn(): Promise<boolean> {
		try {
			const res = this.pocketbase.authStore.isValid;

			return res;
		} catch (err) {
			throw new Error('Error checking if logged in');
		}
	}
}
