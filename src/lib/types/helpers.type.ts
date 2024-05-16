type StorageHelper = {
	set: (key: string, value: any) => void;
	get: (key: string) => any;
	remove: (key: string) => void;
};

export type { StorageHelper };
