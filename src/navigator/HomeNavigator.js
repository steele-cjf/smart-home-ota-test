/**
 * @router home
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../page/Home/index';
import Agreement from '../page/Login/Agreement';
import AuthenticationPage from '../page/Home/AuthenticationPage';
import IdCardVertify from '../page/Home/IdCardVertify';
import PassportVertify from '../page/Home/PassportVertify';
import VertifyDetailsPage from '../page/Home/VertifyDetails';
import PersonalInfo from '../page/My/PersonalInfo';
import UnrecordedHouse from '../page/Home/UnrecordedHouse';
import RecordHouse from '../page/My/RecordHouse';
import AuditHouse from '../page/Home/AuditHouse';
import HouseList from '../page/Home/HouseList';
import MyHouseList from '../page/My/MyHouseList';
import MapHousePage from '../page/Home/MapHouse';
import PublishHouseDetail from '../page/Home/PublishHouseDetail';
import HouseDetail from '../page/Feature/HouseDetail';
import MyPublishHouse from '../page/My/MyPublishHouse';
import PublishHouse from '../page/Feature/publishHouse';
import { Platform } from 'react-native'
import { AppRoute } from './AppRoutes';
import { houseDetail } from '../store/house';

const HomeStack = createStackNavigator();

export const HomeStackComponent = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        animationEnabled: Platform.OS === 'android' ? false : true,
        cardStyle: {
          fontSize: $screen.scaleSize(16),
          backgroundColor: '#fff',
        },
      }}>
      <HomeStack.Screen
        name={AppRoute.HOME}
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.AGREEMENT}
        component={Agreement}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.MAPHOUSE}
        component={MapHousePage}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.AUTHENTICATION}
        component={AuthenticationPage}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.IDCARDVERTIFY}
        component={IdCardVertify}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.PASSPORTVERTIFY}
        component={PassportVertify}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.VERDETAILS}
        component={VertifyDetailsPage}
        options={{
          title: '实名详情',
          headerBackTitle: '返回',
          headerShown: false,
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
          headerShown: false
        }}
      />
      <HomeStack.Screen
        name={AppRoute.RECORD}
        component={RecordHouse}
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen
        name={AppRoute.HOUSELIST}
        component={HouseList}
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen
        name={AppRoute.MYHOUSELIST}
        component={MyHouseList}
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen
        name={AppRoute.PUBLISHOUSEDETAIL}
        component={PublishHouseDetail}
        options={{
          headerShown: false
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
        name={AppRoute.PUBLISHLISE}
        component={MyPublishHouse}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={AppRoute.PUBLISH}
        component={PublishHouse}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
