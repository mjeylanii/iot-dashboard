import type { TypedPocketBase, UsersResponse } from '$lib/types/pocketbase.type';
import type { AuthAPIType } from '$types';
import type PocketBase from 'pocketbase';
import type { AdminAuthResponse } from 'pocketbase';

export default class AuthAPI implements AuthAPIType {
	private pocketbase: TypedPocketBase;

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

	public async updateUserPassword(id: string, newPassword: FormData): Promise<UsersResponse> {
		try {
			const res = await this.pocketbase.collection('users').update(id, newPassword);

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
