import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('JATE database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });


export const putDb = async (content) => {
  console.log('Put to the database');

  const jateDb = await openDB('jate', 1);
  const txt = jateDb.transaction('jate', 'readwrite');
  const store = txt.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  console.log(request);

  const result = await request;
  console.log('Data successfully saved to the database', result);
  return result;
}


export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);
  const txt = jateDb.transaction('jate', 'readonly');
  const store = txt.objectStore('jate');
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

initdb();
