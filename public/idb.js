// public/idb.js
import { openDB, deleteDB } from 'idb';

const DATABASE_NAME = 'myDB';
const VERSION = 1;

// Initialize the database
async function initDB(storeName) {
  const db = await openDB(DATABASE_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
        console.log('Database created successfully')
      }
    },
  });
  return db;
}

// Fetch all items from the IndexedDB
export async function getItemsFromIDB(storeName) {
  const db = await initDB(storeName);
  return db.getAll(storeName);
}

// Save an item to IndexedDB
export async function saveItemToIDB(storeName, item) {
  const db = await initDB(storeName);
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.put(item);
  return tx.done;
}

// Delete an item from IndexedDB
export async function deleteItemFromIDB(storeName, id) {
  const db = await initDB(storeName);
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.delete(id);
  return tx.done;
}

// Clear all items from IndexedDB
export async function clearItemsFromIDB(storeName) {
  const db = await initDB(storeName);
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.clear();
  return tx.done;
}

// Update an item in IndexedDB
export async function updateItemInIDB(storeName, item) {
  const db = await initDB(storeName);
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.put(item);
  return tx.done;
}

// Delete the database
export async function deleteDatabase(databaseName = DATABASE_NAME) {
  await deleteDB(databaseName);
}