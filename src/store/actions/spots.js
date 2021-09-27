import * as FileSystem from 'expo-file-system';
import { insertSpot, fetchSpots } from '../../helpers/db';

export const SET_SPOTS = 'fetchSpots';
export const ADD_SPOT = 'addSpot';

export const fetchingSpots = () => {
  return async (dispatch) => {
    try {
      const result = await fetchSpots();
      const arrayData = result.rows._array;

      dispatch({ type: SET_SPOTS, payload: arrayData })
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
}

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
      const dbResult = await insertSpot(
        title,
        newPath,
        'Dummy Endereço',
        15.6,
        12.3
      );
      //console.log(dbResult);
      const id = dbResult.insertId.toString();
      dispatch({
        type: ADD_SPOT,
        payload: { id, title, photo: newPath },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};
