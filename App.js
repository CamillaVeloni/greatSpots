import React from 'react';
import NavigationContainer from './src/navigation/NavigationContainer';
import { useFonts } from 'expo-font';
import Spinner from './src/components/commons/Spinner';

export default function App() {
  const [loadedFonts] = useFonts({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-italic': require('./assets/fonts/Nunito-Italic.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });

  if(!loadedFonts) return <Spinner />;

  return <NavigationContainer />;
}
