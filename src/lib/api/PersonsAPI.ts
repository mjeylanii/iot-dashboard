import PocketBase from 'pocketbase';
import { db_config } from '$lib/config/default/dbconfig.conf';

const pocketbase = new PocketBase(`http://${db_config.host}:${db_config.port}`);

export const authenticateWithDatabase = async (email: string, password: string): Promise<any> => {
  try {
    const res = await pocketbase.admins.authWithPassword(email, password);
    return res;
  } catch (err) {
    throw new Error('Error authenticating with the database');
  }
};

export const fetchPersonnelData = async (): Promise<any[]> => {
  try {
    const res = await pocketbase.collection('personnel').getFullList();
    const personnel = res.map((person: any) => ({
      name: person.name,
      status: person.online,
    }));
    return personnel;
  } catch (err) {
    throw new Error('Error fetching personnel data from the database');
  }
};

export const addPersonnel = async(data: any): Promise<any> => {
  try {
  await pocketbase.collection('personnel').create(data);
  
  }
  catch(err) {
    throw new Error('Error adding personnel to the database');
  }
}
