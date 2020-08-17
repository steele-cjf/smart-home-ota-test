import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPage from '../page/My/MyPage';
import PersonalInfo from '../page/My/PersonalInfo';
import MyHouseList from '../page/My/MyHouseList';
import HouseDetail from '../page/Feature/HouseDetail';
import RecordHouse from '../page/My/RecordHouse';
import MyPublishHouse from '../page/My/MyPublishHouse';
import PublishHouse from '../page/Feature/publishHouse';
import RoomPage from '../page/Feature/roomPage';
import TenantHouseList from '../page/My/TenantHouseList';
import AddTenant from '../page/Feature/addTenant';

import {AppRoute} from './AppRoutes';

const MyPageNavigator = createStackNavigator();

export const MyPageStackComponent = () => {
  return (
    <MyPageNavigator.Navigator
      screenOptions={{
        cardStyle: {
          fontSize: 16,
          backgroundColor: '#fff',
        },
      }}>
      <MyPageNavigator.Screen
        name={AppRoute.MY}
        component={MyPage}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.PERSONALINFO}
        component={PersonalInfo}
        options={{
          title: '个人信息',
          headerBackTitle: '返回',
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.MYHOUSELIST}
        component={MyHouseList}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.HOUSEDETAIL}
        component={HouseDetail}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.RECORD}
        component={RecordHouse}
        options={{
          title: '添加房源',
          headerBackTitle: '返回',
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.PUBLISHLISE}
        component={MyPublishHouse}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.PUBLISH}
        component={PublishHouse}
        options={{
          title: '发布房源',
          headerBackTitle: '返回',
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.ROOM}
        component={RoomPage}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.TENANTHOUSELIST}
        component={TenantHouseList}
        options={{
          title: '我是租户',
          headerBackTitle: '返回',
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.ADDTENANT}
        component={AddTenant}
        options={{
          title: '添加住户',
          headerBackTitle: '返回',
        }}
      />
    </MyPageNavigator.Navigator>
  );
};
