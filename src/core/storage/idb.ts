import { openDB } from 'idb';

const DB_NAME = 'syj-os-cache';
const STORE = 'kv';

export async function putCached<T>(key: string, value: T): Promise<void> {
  const db = await openDB(DB_NAME, 1, { upgrade(database) { database.createObjectStore(STORE); } });
  await db.put(STORE, value, key);
}

export async function getCached<T>(key: string): Promise<T | undefined> {
  const db = await openDB(DB_NAME, 1, { upgrade(database) { database.createObjectStore(STORE); } });
  return db.get(STORE, key) as Promise<T | undefined>;
}
