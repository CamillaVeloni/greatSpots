import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import SpotItem from '../components/spots/SpotItem';

const SpotsListScreen = ({ navigation }) => {
  const spotsList = useSelector(({ spots }) => spots.spots);
  
  return (
    <FlatList
      data={spotsList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SpotItem
          title={item.title}
          address="Figeredo Du Bum DUM"
          image={item.photoUri}
          onSelected={() => {
            navigation.navigate('SpotDetail', { spotId: item.id, spotTitle: item.title })
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default SpotsListScreen;
