import React from 'react';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';

import { store } from './src/store';
import NavigationContainer from './src/navigation/NavigationContainer';
import Spinner from './src/components/commons/Spinner';

export default function App() {
  const [loadedFonts] = useFonts({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-italic': require('./assets/fonts/Nunito-Italic.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });

  if(!loadedFonts) return <Spinner />;

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
