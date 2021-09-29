import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';

import Colors from '../../../constants/Colors';
import MapPreview from '../commons/MapPreview';

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status != 'granted') {
      Alert.alert(
        'Permissão negada',
        'Você precisa dar acesso a localização do dispositivo para usar essa função.',
        [{ text: 'Okay' }]
      );

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    try {
      setIsFetching(true);
      // https://github.com/expo/expo/issues/5504 && https://github.com/expo/expo/issues/14248
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });
      // const location = await Location.getLastKnownPositionAsync();
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        'Não foi possível rastrear sua localização',
        'Por favor, tente outra vez mais tarde ou escolha uma localização no mapa.',
        [{ text: 'Okay' }]
      );
      //console.log(err);
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.container}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator color={Colors.primary} size="large" />
        ) : (
          <Text style={styles.text}>Nenhum local foi escolhido ainda!</Text>
        )}
      </MapPreview>
      <Button
        title="Pegar minha localização"
        onPress={getLocationHandler}
        color={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignItems: 'center',
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  text: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
  },
});

export default LocationPicker;
