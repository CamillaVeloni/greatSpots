import React, { useState } from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

import MapPreview from '../components/commons/MapPreview';

const SpotDetailScreen = ({ navigation, route }) => {
  const { spotId } = route.params;
  const spotDetails = useSelector(({ spots }) =>
    spots.spots.find((spot) => spot.id === spotId)
  );
  const locationDetails = {
    latitude: spotDetails.lat,
    longitude: spotDetails.lng,
  };

  const onClickMapHandler = () => {
    navigation.navigate('Map', {
      readonly: true,
      initialLocation: locationDetails,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      showsVerticalScrollIndicator={false}
    >
      <Image source={{ uri: spotDetails.photoUri }} style={styles.photo} />
      <View style={styles.detailsContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{spotDetails.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={locationDetails}
          onPress={onClickMapHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  photo: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  detailsContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  addressText: {
    fontFamily: 'nunito-regular',
    fontSize: 16,
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default SpotDetailScreen;
