import * as SQLite from 'expo-sqlite';

// Database object
const database = SQLite.openDatabase('spots.db');
// ${FileSystem.documentDirectory}/SQLite/${spot.db}

// Inicializando table (criando table se não existir)
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS spots(id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, photoUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        (_, resultSet) => {
          resolve(resultSet);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

// Inserindo novo Spot (ver models) 
export const insertSpot = (title, photoUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql('INSERT INTO spots (title, photoUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)', 
      [title, photoUri, address, lat, lng], 
      (_, resultSet) => {
        resolve(resultSet);
      },
      (_, err) => {
        reject(err);
      })
    })
  });

  return promise;
}

export const fetchSpots = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT * FROM spots', 
      [], 
      (_, resultSet) => {
        resolve(resultSet);
      }, 
      (_, err) => {
        reject(err);
      });
    })
  });

  return promise;
}