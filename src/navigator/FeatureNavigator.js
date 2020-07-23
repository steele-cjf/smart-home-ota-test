import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeaturePage from '../page/Feature/index';
import HouseDetail from '../page/Home/HouseDetail';
import PublishHouse from '../page/Feature/publishHouse';
import AddTenant from '../page/Feature/addTenant';
import {AppRoute} from './AppRoutes';

const HomeStack = createStackNavigator();

export const FeatureStackComponent = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={AppRoute.FEATURE}
        component={FeaturePage}
        options={{
          title: '更多功能',
          // headerBackTitle: '更多功能',
        }}
      />
      <HomeStack.Screen
        name={AppRoute.HOUSEDETAIL}
        component={HouseDetail}
        options={{
          title: '查看房源',
          headerBackTitle: '返回',
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
    </HomeStack.Navigator>
  );
};
