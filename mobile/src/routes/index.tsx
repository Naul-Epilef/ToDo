import React from 'react';
import 'react-native-gesture-handler';
import {Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import Tasks from '../pages/tasks';

const Auth = createStackNavigator();

const Routes = () => {
  return (
    <Auth.Navigator initialRouteName="Tasks">
      <Auth.Screen name="Tasks" component={Tasks} />
    </Auth.Navigator>
  );
};

export default Routes;
