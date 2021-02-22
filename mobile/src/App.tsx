import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';

import Routes from './routes';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
