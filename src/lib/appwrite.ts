import { Client, Account, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  .setDevKey(import.meta.env.VITE_APPWRITE_DEV_KEY);

const account = new Account(client);
const tablesDB = new TablesDB(client);

export { client, account, tablesDB };
