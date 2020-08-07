import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../page/Home/index';
import AuthenticationPage from '../page/Home/AuthenticationPage';
import IdCardVertify from '../page/Home/IdCardVertify';
import PassportVertify from '../page/Home/PassportVertify';
import UnrecordedHouse from '../page/Home/UnrecordedHouse';
import RecordHouse from '../page/Home/RecordHouse';
import AuditHouse from '../page/Home/AuditHouse';
import HouseList from '../page/Home/HouseList';
import MyHouseList from '../page/Home/MyHouseList';
import MapHousePage from '../page/Home/MapHouse';


import { AppRoute } from './AppRoutes';

const HomeStack = createStackNavigator();

export const HomeStackComponent = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        cardStyle: {
          fontSize: 16,
          backgroundColor: '#fff'
        }
      }}>
      <HomeStack.Screen
        name={AppRoute.HOME}
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.MAPHOUSE}
        component={MapHousePage}
        options={{
          title: '地图找房',
          headerBackTitle: '返回',
        }}
      />
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
          title: '身份证认证',
          headerBackTitle: '返回',
        }}
      />
      <HomeStack.Screen
        name={AppRoute.PASSPORTVERTIFY}
        component={PassportVertify}
        options={{
          title: '护照认证',
          headerBackTitle: '返回',
        }}
      />
      <HomeStack.Screen
        name={AppRoute.UNRECORD}
        component={UnrecordedHouse}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.AUDIT}
        component={AuditHouse}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.RECORD}
        component={RecordHouse}
        options={{
          title: '添加房源',
          headerBackTitle: '返回',
        }}
      />
      <HomeStack.Screen
        name={AppRoute.HOUSELIST}
        component={HouseList}
        options={{
          title: '房源列表',
        }}
      />
      <HomeStack.Screen
        name={AppRoute.MYHOUSELIST}
        component={MyHouseList}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
