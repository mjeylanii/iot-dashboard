import { Store } from "tauri-plugin-store-api";

const store = new Store(".settings.dat");

export const init = async (): Promise<void> => {
  
    //App dir
  
    await store.load();
    if (!store.has("people")) {
        store.set("people", []);    
    }
}
/**
 * Get the value of a key from the store.
 * @param key The key to get the value of.
 * @returns A Promise that resolves to the value of the key.
 */
export const get = async (key: string): Promise<any> => {
  await store.load();
  return store.get(key);
};

/**
 * Set the value of a key in the store.
 * @param key The key to set the value of.
 * @param value The value to set for the key.
 */
export const set = async (key: string, value: any): Promise<void> => {
  await store.load();
  store.set(key, value);
  await store.save();
};

/**
 * Remove a key and its value from the store.
 * @param key The key to remove.
 */
export const remove = async (key: string): Promise<void> => {
  await store.load();
  store.delete(key);
  await store.save();
};

/**
 * Remove all keys and their values from the store.
 */
export const clear = async (): Promise<void> => {
  await store.load();
  store.clear();
  await store.save();
};

/**
 * Get all keys and their values from the store.
 * @returns A Promise that resolves to an array of key-value pairs.
 */
export const getAll = async (): Promise<[string, any][]> => {
  await store.load();
  return Object.entries(store);
};

/**
 * Save any changes made to the store.
 */
export const save = async (): Promise<void> => {
  await store.load();
  await store.save();
}