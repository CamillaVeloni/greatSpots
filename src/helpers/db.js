import * as SQLite from 'expo-sqlite';

// Database object
const database = SQLite.openDatabase('spots.db');
// ${FileSystem.documentDirectory}/SQLite/${spot.db}

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS spots(id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, photoUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};
