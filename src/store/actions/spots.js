import * as FileSystem from 'expo-file-system';

export const ADD_SPOT = 'addSpot';

export const savingSpot = (title, photo) => {
  return async (dispatch) => {
    const fileName = photo.split('/').pop(); // nameFolder/nameFile.jpg => ['nameFolder', 'nameFile.jpg'] => 'nameFile.jpg'
    const newPath = FileSystem.documentDirectory + fileName; // gerando path

    // Armazenando o uri em um local permanente (FileSystem) 
    // photo === temporario && newPath === permanente
    try {
      await FileSystem.moveAsync({
        from: photo,
        to: newPath,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    dispatch({
      type: ADD_SPOT,
      payload: { title, photo: newPath },
    });
  };
};
