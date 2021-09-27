import React from 'react';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';

import { init } from './src/helpers/db';
import { store } from './src/store';
import NavigationContainer from './src/navigation/NavigationContainer';
import Spinner from './src/components/commons/Spinner';

init().then(() => {
  //console.log('Database inicializado.')
}).catch((err) => {
  console.log('Database não inicializado.');
  console.log(err)
});

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
