import PocketBase from 'pocketbase';
import { db_config } from '$lib/config/default/dbconfig.conf';

const pocketbase = new PocketBase(`http://${db_config.host}:${db_config.port}`);

export const authenticateWithDatabase = async (email: string, password: string): Promise<any> => {
	try {
		const res = await pocketbase.admins.authWithPassword(email, password);
		console.log(res);
		return res;
	} catch (err) {
		throw new Error('Error authenticating with the database');
	}
};

export const logOut = async (): Promise<any> => {
	try {
		const res = await pocketbase.authStore.clear();
		return res;
	} catch (err) {
		throw new Error('Error logging out');
	}
};

export const updateUserPassword = async (id: string, data: any): Promise<any> => {
	try {
		const res = await pocketbase.collection('users').update(id, data);
		return res;
	} catch (err) {
		throw new Error('Error updating user password');
	}
};

export const resetPassword = async (email: string): Promise<any> => {
	try {
		const res = await pocketbase.admins.requestPasswordReset(email);
		console.log(res);
		return res;
	} catch (err) {
		throw new Error('Error resetting password');
	}
};

export const checkIfLoggedIn = async (): Promise<any> => {
	try {
		const res = await pocketbase.authStore.isValid;
		return res;
	} catch (err) {
		throw new Error('Error checking if logged in');
	}
};