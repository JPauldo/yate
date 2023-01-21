import { openDB } from 'idb';

const initdb = async () =>
  openDB('yateDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('content')) {
        console.log('yate database already exists');
        return;
      }
      db.createObjectStore('content', { keyPath: 'id', autoIncrement: true });
      console.log('yate database created');
    }
  });

// // TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.error('putDb not implemented');
  console.log('PUT to the database');
  
  const yateDB = await openDB('yateDB', 1);
  const tx = yateDB.transaction('content', 'readonly');
  const request = tx.store.put({ id: 1, value: content });
  const result = await request;

  console.log('🚀 - data saved to the database', result);
};

// // TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented');
  console.log('GET from the database');
  
  const yateDB = await openDB('yateDB', 1);
  const tx = yateDB.transaction('content', 'readonly');
  const request = tx.store.get(1);
  const result = await request;
  
  console.log('result.value', result);
  return result;
};

initdb();
