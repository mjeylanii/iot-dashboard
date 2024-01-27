import PocketBase from 'pocketbase';
import { db_config } from '$lib/config/default/dbconfig.conf';
import { alerts } from '$lib/stores/store';

const pocketbase = new PocketBase(`http://${db_config.host}:${db_config.port}`);

const createImageUrl = (record: any, filename: string) => {
	return (
		`http://${db_config.host}:${db_config.port}/api/files/personnel/` + record.id + '/' + filename
	);
};

export const fetchPersonnelData = async (): Promise<any[]> => {
	try {
		const res = await pocketbase.collection('personnel').getFullList();
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
			profile_image: person.profile_image
		}));
		return personnel;
	} catch (err) {
		throw new Error('Error fetching personnel data from the database');
	}
};

export const fetchOnePersonnelData = async (id: string): Promise<any> => {
	try {
		const res = await pocketbase.collection('personnel').getOne(id);
		console.log(res);
		const firstFilename = res.profile_image;
		res.profile_image = createImageUrl(res, firstFilename);
		const personnel = {
			id: res.id,
			name: res.name,
			email: res.email,
			status: res.online,
			profile_image: res.profile_image
		};
		return personnel;
	} catch (err) {
		throw new Error('Error fetching personnel data from the database');
	}
};

export const addPersonnel = async (data: any): Promise<any> => {
	const formData = new FormData();
	if (data.profile_image) {
		formData.append('profile_image', data.profile_image[0]);
	}
	formData.append('name', data.name);
	formData.append('email', data.email);
	formData.append('last_present', data.last_present);
	formData.append('online', data.online);

	try {
		await pocketbase
			.collection('personnel')
			.create(formData)
			.then((res) => {
				console.log(res);
				alerts.update((alerts) => [
					...alerts,
					{ id: alerts.length++, type: 'success', message: 'Personnel added successfully' }
				]);
			})
			.catch((err) => {
				console.log(err);
				alerts.update((alerts) => [
					...alerts,
					{
						id: alerts.length++,
						type: 'error',
						message: 'Error adding personnel. Check if already exists'
					}
				]);
			});
	} catch (err) {
		throw new Error('Error adding personnel to the database');
	}
};

export const updatePersonnel = async (id: string, data: any): Promise<any> => {
	const formData = new FormData();
	if (data.profile_image) {
		formData.append('profile_image', data.profile_image[0]);
	}
	formData.append('name', data.name);
	formData.append('email', data.email);

	try {
		await pocketbase.collection('personnel').update(id, formData);
	} catch (err) {
		throw new Error('Error updating personnel in the database');
	}
};

export const fetchUsersData = async (): Promise<any[]> => {
	try {
		const res = await pocketbase.collection('users').getFullList();
		console.log(res);
		const users = res.map((user: any) => ({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			password: user.password
		}));
		return users;
	} catch (err) {
		throw new Error('Error fetching users data from the database');
	}
};

export function checkOnline() {
	const res = pocketbase.authStore.isValid;
	console.log(res);
	return res;
}
