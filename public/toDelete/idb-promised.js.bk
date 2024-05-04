// idb-promised.js
import { openDB } from 'idb';

async function initDB() {
  const db = await openDB('NotesDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', { keyPath: 'id' });
      }
    },
  });
  return db;
}

async function getNotesFromDB() {
  const db = await initDB();
  return db.getAll('notes');
}

async function saveNoteToDB(note) {
  const db = await initDB();
  const tx = db.transaction('notes', 'readwrite');
  tx.store.put(note);
  return tx.done;
}

async function deleteNoteFromDB(id) {
  const db = await initDB();
  const tx = db.transaction('notes', 'readwrite');
  tx.store.delete(id);
  return tx.done;
}

export { getNotesFromDB, saveNoteToDB, deleteNoteFromDB };
