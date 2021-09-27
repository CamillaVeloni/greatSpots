import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import SpotItem from '../components/spots/SpotItem';
import * as spotsActions from '../store/actions/spots';

const SpotsListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const spotsList = useSelector(({ spots }) => spots.spots);

  useEffect(() => {
    dispatch(spotsActions.fetchingSpots());
  }, [dispatch]);
  
  return (
    <FlatList
      data={spotsList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SpotItem
          title={item.title}
          address={item.address}
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
