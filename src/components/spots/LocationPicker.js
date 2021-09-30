import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../../constants/Colors';
import MapPreview from '../commons/MapPreview';

const LocationPicker = ({ id, route, onLocationPicked }) => {
  const navigation = useNavigation();

  const [pickedLocation, setPickedLocation] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // Verificando se retornou local selecionado do MapScreen
  const mapPickedLocation = route.params?.pickedLocation ?? null;

  // Checando se foi escolhido um local no mapa
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(id, mapPickedLocation, true);
    };
  }, [mapPickedLocation, onLocationPicked]);

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

  // Pegando local do usuário pelo expo location (usa a function verifyPermissions para localizar dispositivo)
  // Seta static img (i.e. MapPreview)
  // Aciona function do component pai ~~ passa o local selecionado para o form do SpotCreateScreen
  const pickOnLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    try {
      setIsFetching(true);
      // https://github.com/expo/expo/issues/5504 && https://github.com/expo/expo/issues/14248
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });
      // const location = await Location.getLastKnownPositionAsync();
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      onLocationPicked( id, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }, true);

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

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  return (
    <View style={styles.container}>
      <MapPreview
        onPress={pickOnMapHandler}
        style={styles.mapPreview}
        location={pickedLocation}
      >
        {isFetching ? (
          <ActivityIndicator color={Colors.primary} size="large" />
        ) : (
          <Text style={styles.text}>Nenhum local foi escolhido ainda!</Text>
        )}
      </MapPreview>
      <View style={styles.containerActions}>
        <Button
          title="Minha localização"
          onPress={pickOnLocationHandler}
          color={Colors.primary}
        />
        <Button
          title="Mapa"
          onPress={pickOnMapHandler}
          color={Colors.primary}
        />
      </View>
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
  containerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  text: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
  },
});

export default LocationPicker;
