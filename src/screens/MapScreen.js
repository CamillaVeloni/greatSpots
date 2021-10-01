import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import Colors from '../../constants/Colors';

const MapScreen = ({ navigation, route }) => {
  // Veio de SpotDetailsScreen (i.e. onClickMapHandler)
  // readonly é usado em dois lugares: em selectLocationHandler para não ser selecionado outro lugar
  // em useLayoutEffect para não ser criado o botão de salvar
  const initialLocation = route.params?.initialLocation;
  const readonly = route.params?.readonly;

  // State para seleção do local
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [mapRegion, setMapRegion] = useState(initialLocation ? {
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : null);

  // Verificando localização do usuário para initialRegion de novo spot
  useEffect(() => {
    if (readonly) return;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Você precisa dar acesso a localização do seu disposito para que possamos mostrar sua localização.',
          [{ text: 'Okay' }]
        );
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });

      setMapRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, [readonly]);

  // Pegando coordenadas com o MapView
  const selectLocationHandler = (event) => {
    if (readonly) return;
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

  // A função do useLayoutEffect é 'disparado' sincronicamente, ANTES das mutações do DOM serem feitas
  // Criando option de salvar no header (i.e. https://reactnavigation.org/docs/header-buttons/)
  useLayoutEffect(() => {
    if (readonly) return;

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
  }, [navigation, readonly, savePickedLocationHandler]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
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
