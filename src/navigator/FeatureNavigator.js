import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeaturePage from '../page/Feature/index';
import HouseDetail from '../page/Home/HouseDetail';
import PublishHouse from '../page/Feature/publishHouse';
import AddTenant from '../page/Feature/addTenant';
import RoomPage from '../page/Feature/roomPage';
import ComponentTest from '../page/ComponentTest/index';
import {AppRoute} from './AppRoutes';

const HomeStack = createStackNavigator();

export const FeatureStackComponent = () => {
  return (
    <HomeStack.Navigator
      mode="modal"
      screenOptions={{
        cardStyle: {
          fontSize: 16,
          backgroundColor: '#fff'
        },
      }}>
      <HomeStack.Screen
        name={AppRoute.FEATURE}
        component={FeaturePage}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.HOUSEDETAIL}
        component={HouseDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.PUBLISH}
        component={PublishHouse}
        options={{
          title: '发布房源',
          headerBackTitle: '返回',
        }}
      />
      <HomeStack.Screen
        name={AppRoute.ADDTENANT}
        component={AddTenant}
        options={{
          title: '添加住户',
          headerBackTitle: '返回',
        }}
      />
      <HomeStack.Screen
        name={AppRoute.ROOM}
        component={RoomPage}
        options={{
          headerShown: false,
        }}
        // options={{
        //   title: '房间管理',
        //   headerBackTitle: '返回',
        // }}
      />
      <HomeStack.Screen
        name={AppRoute.COMPONENTTEST}
        component={ComponentTest}
        options={{
          title: 'ComponentTest',
          headerBackTitle: '返回',
        }}
      />
    </HomeStack.Navigator>
  );
};
