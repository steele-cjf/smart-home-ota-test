import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../page/Home/index';
import {AuthenticationPage} from '../page/Home/AuthenticationPage';
import {AppRoute} from './AppRoutes';

const HomeStack = createStackNavigator();

export const HomeStackComponent = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={AppRoute.HOME} component={HomePage} />
      <HomeStack.Screen
        name={AppRoute.AUTHENTICATION}
        component={AuthenticationPage}
      />
    </HomeStack.Navigator>
  );
};
