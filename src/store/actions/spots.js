import * as FileSystem from 'expo-file-system';
import ENV from '../../../env';

import { insertSpot, fetchSpots } from '../../helpers/db';

export const SET_SPOTS = 'fetchSpots';
export const ADD_SPOT = 'addSpot';

// https://developers.google.com/maps/documentation/geocoding/overview?authuser=1#reverse-status
function getReverseStatus(status) {
  const allStatus = {
    "ZERO_RESULTS":
      'O reverse geocoding foi bem-sucedida, mas não retornou resultados',
    "OVER_QUERY_LIMIT": 'Você passou da quota',
    "REQUEST_DENIED": 'Request foi negado',
    "INVALID_REQUEST": 'Algo está faltando ou tem algo invalido',
    "UNKNOWN_ERROR": 'Não foi processado por um erro do server',
  };

  return allStatus[status] ?? "Não foi achado o erro";
}

export const fetchingSpots = () => {
  return async (dispatch) => {
    try {
      const result = await fetchSpots();
      const arrayData = result.rows._array;

      dispatch({ type: SET_SPOTS, payload: arrayData });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const savingSpot = (title, photo, location) => {
  return async (dispatch) => {

    /// Usando Geocoding API para pegar endereço com latitude e longitude passada (location)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`
    ).catch((e) => {
      console.log("error:", e);
      throw new Error('Algo deu errado');
    });

    const respData = await response.json();
    if (respData.status != "OK") {
      const errorMessage = getReverseStatus(respData.status);

      throw new Error(errorMessage);
    }
    const address = respData.results[0].formatted_address;

    // Gerando path para foto
    const fileName = photo.split('/').pop(); // nameFolder/nameFile.jpg => ['nameFolder', 'nameFile.jpg'] => 'nameFile.jpg'
    const newPath = FileSystem.documentDirectory + fileName; // gerando path

    // Armazenando a foto em um local permanente (FileSystem)
    // photo === temporario && newPath === permanente
    // Inserindo spot (local) no sqlite (i.e. helpers/db)
    try {
      await FileSystem.moveAsync({
        from: photo,
        to: newPath,
      });
      const dbResult = await insertSpot(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      );
      //console.log(dbResult);
      const id = dbResult.insertId.toString();
      dispatch({
        type: ADD_SPOT,
        payload: { id, title, photo: newPath, address, coords: {
          lat: location.latitude,
          lng: location.longitude
        } },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};
