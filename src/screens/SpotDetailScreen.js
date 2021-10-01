import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MapPreview from '../components/commons/MapPreview';

const SpotDetailScreen = ({ route }) => {
  const { spotId } = route.params;
  const spotDetails = useSelector(({ spots }) =>
    spots.spots.find((spot) => spot.id === spotId)
  );

  return (
    <ScrollView>
      <Image />
      <View>
        <Text>{spotDetails.address}</Text>
        <MapPreview />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default SpotDetailScreen;
