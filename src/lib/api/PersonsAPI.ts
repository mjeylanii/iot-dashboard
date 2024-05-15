import type PocketBase from 'pocketbase';

import { getPocketbase } from '$lib/helpers/storageHelper';
//import { db_config } from '$lib/config/dbconfig.conf';
import { alerts } from '$lib/stores/ui';

/*let db_config: any;
let pocketbase: any;
const loadConfig = async () => {
	db_config = await getPocketbase();
	console.log(db_config);
	pocketbase = new PocketBase(`http://${db_config.host}:${db_config.port}`);
};
loadConfig();*/

export class PersonsAPI {
	private pocketbase: PocketBase;
	constructor(pocketbase: PocketBase) {
		this.pocketbase = pocketbase;
	}
	/* const createImageUrl = (record: any, filename: string) => {
		return (
			`http://${db_config.host}:${db_config.port}/api/files/personnel/` + record.id + '/' + filename
		);
};*/
	public async fetchPersonnelData(): Promise<User[]> {
		try {
			const res = await this.pocketbase.collection('personnel').getFullList();
			console.log(res);
			res.forEach((person: any) => {
				const firstFilename = person.profile_image;
				person.profile_image = createImageUrl(person, firstFilename);
			});
			const personnel = res.map((person: any) => ({
				id: person.id,
				name: person.name,
				email: person.email,
				status: person.online,
				profile_image: person.profile_image,
			}));
			return personnel;
		} catch (err) {
			throw new Error('Error fetching personnel data from the database');
		}
	}

	public async fetchOnePersonnelData(id: string): Promise<User> {
		try {
			const res = await this.pocketbase.collection('personnel').getOne(id);
			console.log(res);
			const firstFilename = res.profile_image;
			res.profile_image = createImageUrl(res, firstFilename);
			const personnel = {
				id: res.id,
				name: res.name,
				email: res.email,
				status: res.online,
				profile_image: res.profile_image,
			};
			return personnel;
		} catch (err) {
			throw new Error('Error fetching personnel data from the database');
		}
	}

	public async addPersonnel(data: any): Promise<any> {
		const formData = new FormData();
		if (data.profile_image) {
			formData.append('profile_image', data.profile_image[0]);
		}
		formData.append('name', data.name);
		formData.append('email', data.email);
		formData.append('last_present', data.last_present);
		formData.append('online', data.online);

		try {
			await this.pocketbase
				.collection('personnel')
				.create(formData)
				.then((res: any) => {
					console.log(res);
					alerts.update((alerts: any) => [
						...alerts,
						{ id: alerts.length++, type: 'success', message: 'Personnel added successfully' },
					]);
				})
				.catch((err: any) => {
					console.log(err);
					alerts.update((alerts: any) => [
						...alerts,
						{
							id: alerts.length++,
							type: 'error',
							message: 'Error adding personnel. Check if already exists',
						},
					]);
				});
		} catch (err) {
			throw new Error('Error adding personnel to the database');
		}
	}

	public async updatePersonnel(id: string, data: any): Promise<any> {
		const formData = new FormData();
		if (data.profile_image) {
			formData.append('profile_image', data.profile_image[0]);
		}
		formData.append('name', data.name);
		formData.append('email', data.email);

		try {
			await this.pocketbase.collection('personnel').update(id, formData);
		} catch (err) {
			throw new Error('Error updating personnel in the database');
		}
	}

	public async fetchUsersData(): Promise<any[]> {
		try {
			const res = await this.pocketbase.collection('users').getFullList();
			console.log(res);
			const users = res.map((user: any) => ({
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				password: user.password,
			}));
			return users;
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
