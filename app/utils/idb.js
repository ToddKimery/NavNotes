// utils/idb.js

import { openDB } from 'idb';

const DATABASE_NAME = 'NotesDB';
const STORE_NAME = 'notes';
const VERSION = 1;

// Initialize the database
async function initDB() {
  const db = await openDB(DATABASE_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
  return db;
}

// Fetch all notes from the IndexedDB
export async function getNotesFromIDB() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

// Save a note to IndexedDB
export async function saveNoteToIDB(note) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.put(note);
  return tx.done;
}

// Delete a note from IndexedDB
export async function deleteNoteFromIDB(id) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.delete(id);
  return tx.done;
}

// More functions can be added as needed
