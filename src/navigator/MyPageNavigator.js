import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '../page/MyPage';
import MyHouseList from '../page/Home/MyHouseList';

import { AppRoute } from './AppRoutes';

const MyPageNavigator = createStackNavigator();

export const MyPageStackComponent = () => {
  return (
    <MyPageNavigator.Navigator
      screenOptions={{
        cardStyle: {
          fontSize: 16,
          backgroundColor: '#fff'
        }
      }}>
      <MyPageNavigator.Screen
        name={AppRoute.MY}
        component={MyPage}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.MYHOUSELIST}
        component={MyHouseList}
        options={{
          headerShown: false,
        }}
      />
    </MyPageNavigator.Navigator>
  );
};
