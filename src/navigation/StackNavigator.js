import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/commons/HeaderButton';
import SpotsListScreen from '../screens/SpotsListScreen';
import SpotDetailScreen from '../screens/SpotDetailScreen';
import SpotCreateScreen from '../screens/SpotCreateScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../../constants/Colors';

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerTitleStyle: {
    fontFamily: 'nunito-regular',
  },
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Spots"
        component={SpotsListScreen}
        options={({ navigation }) => ({
          title: 'Todos Spots',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="create"
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => navigation.navigate('SpotCreate')}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen name="SpotDetail" component={SpotDetailScreen} />
      <Stack.Screen name="SpotCreate" component={SpotCreateScreen}
        options={{ title: 'Adicionar Spot' }}
      />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

export { StackNavigator };
