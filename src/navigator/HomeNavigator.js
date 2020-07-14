import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../page/Home/index';
import AuthenticationPage from '../page/Home/AuthenticationPage';
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
        options={{
          title: '实名认证',
          headerBackTitle: '返回',
        }}
      />
      <HomeStack.Screen
        name={AppRoute.IDCARDVERTIFY}
        component={IdCardVertify}
        options={{
          title: '身份证人工验证',
          headerBackTitle: '返回',
        }}
      />
      <HomeStack.Screen
        name={AppRoute.PASSPORTVERTIFY}
        component={PassportVertify}
        options={{
          title: '护照人工认证',
          headerBackTitle: '返回',
        }}
      />
    </HomeStack.Navigator>
  );
};
