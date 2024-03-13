import PocketBase from 'pocketbase';
import { db_config } from '$lib/config/dbconfig.conf';

//Create a database class

export const pocketbase = new PocketBase(`http://${db_config.host}:${db_config.port}`);
