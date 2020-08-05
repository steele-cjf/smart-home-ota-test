import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import {AppRoute} from './AppRoutes';
const Stack = createStackNavigator();

export const AppNavigator = props => (
  <Stack.Navigator {...props} headerMode="none">
    <Stack.Screen name={AppRoute.LOGIN} component={AuthNavigator} />
    <Stack.Screen name={AppRoute.HOME} component={TabNavigator} />
  </Stack.Navigator>
);
