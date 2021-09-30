import React, { useState, useLayoutEffect, useCallback } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../../constants/Colors';

const MapScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Pegando coordenadas com o MapView
  const selectLocationHandler = (event) => {
    //console.log(event.nativeEvent);
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  // Função para salvar local escolhido
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // Poderia mostrar uma alerta aqui!
      return;
    }

    navigation.navigate({
      name: 'SpotCreate',
      params: { pickedLocation: selectedLocation },
    });
  }, [selectedLocation]);

  // A função do useLayoutEffect é 'disparado' sincronicamente, ANTES do das mutações do DOM serem feitas
  // Criando option de salvar no header (i.e. https://reactnavigation.org/docs/header-buttons/)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={savePickedLocationHandler}
        >
          <Text style={styles.headerButtonText}>Salvar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker title="Local Escolhido" coordinate={selectedLocation} />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  headerButton: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 18,
    fontFamily: 'nunito-regular',
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
});

export default MapScreen;
