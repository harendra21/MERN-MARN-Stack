import { Client, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('665d7f760030a57c1b6b'); // Replace with your project ID

export const db = new Databases(client);
export { ID, Query } from 'appwrite';
