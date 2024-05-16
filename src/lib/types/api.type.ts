import type { AdminAuthResponse } from 'pocketbase';

import type { UsersResponse } from './pocketbase.type';

type AuthAPIType = {
	logIn: (email: string, password: string) => Promise<AdminAuthResponse>;
	logOut: () => Promise<void>;
	updateUserPassword: (id: string, newPassword: FormData) => Promise<UsersResponse>;
	resetPassword: (email: string) => Promise<boolean>;
	checkIfLoggedIn: () => Promise<boolean>;
};

type PersonsAPIType = {
	getPersons: () => Promise<UsersResponse[]>;
	getPerson: (id: string) => Promise<UsersResponse>;
	createPerson: (person: FormData) => Promise<UsersResponse>;
	updatePerson: (id: string, person: FormData) => Promise<UsersResponse>;
	deletePerson: (id: string) => Promise<void>;
	subscribeToPersons: (id: string) => void;
};

export type { AuthAPIType, PersonsAPIType };
