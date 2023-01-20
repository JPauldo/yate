import { openDB } from 'idb';

const initdb = async () =>
  openDB('jateDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('content')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('content', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// // TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.error('putDb not implemented');
  console.log('PUT to the database');
  
  const jateDB = await jateDB('jateDB', 1);
  const tx = jateDB.transaction('content', 'readonly');
  const request = tx.store.put({ id: 1, value: content });
  const result = await request;

  console.log('🚀 - data saved to the database', result);
};

// // TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented');
  console.log('GET from the database');
  
  const jateDB = await jateDB('jateDB', 1);
  const tx = jateDB.transaction('content', 'readonly');
  const request = tx.store.get(1);
  const result = await request;
  
  console.log('result.value', result);
  return result.value;
};

initdb();
