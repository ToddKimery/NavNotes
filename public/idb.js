// public/idb.js


const DATABASE_NAME = 'myDB';
const VERSION = 1;

// Initialize the database
 async function initDB(storeName) {
  const db = await idb.openDB(DATABASE_NAME, VERSION, {
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
  async function getItemsFromIDB(storeName) {
  const db = await initDB(storeName);
  return db.getAll(storeName);
}

// Save an item to IndexedDB
  async function saveItemToIDB(storeName, item) {
  const db = await initDB(storeName);
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.put(item);
  return tx.done;
}

// Delete an item from IndexedDB
  async function deleteItemFromIDB(storeName, id) {
  const db = await initDB(storeName);
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.delete(id);
  return tx.done;
}

// Clear all items from IndexedDB
  async function clearItemsFromIDB(storeName) {
  const db = await initDB(storeName);
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.clear();
  return tx.done;
}

// Update an item in IndexedDB
  async function updateItemInIDB(storeName, item) {
  const db = await initDB(storeName);
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.put(item);
  return tx.done;
}

// Delete the database
  async function deleteDatabase(databaseName = DATABASE_NAME) {
  await deleteDB(databaseName);
}