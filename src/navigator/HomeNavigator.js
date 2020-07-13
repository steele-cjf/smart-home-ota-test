import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../page/Home/index';
import {AuthenticationPage} from '../page/Home/AuthenticationPage';
import IdCardVertify from '../page/Home/IdCardVertify';
import PassportVertify from '../page/Home/PassportVertify';


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
      <HomeStack.Screen
        name={AppRoute.IDCARDVERTIFY}
        component={IdCardVertify}
      />
      <HomeStack.Screen
        name={AppRoute.PASSPORTVERTIFY}
        component={PassportVertify}
      />
    </HomeStack.Navigator>
  );
};
