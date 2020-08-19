import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPage from '../page/My/MyPage';
import PersonalInfo from '../page/My/PersonalInfo';
import VertifyDetailsPage from '../page/Home/VertifyDetails';
import Suggestion from '../page/My/SuggestionPage';
import About from '../page/My/AboutPage';
import Agreement from '../page/Login/Agreement';
import MyHouseList from '../page/My/MyHouseList';
import HouseDetail from '../page/Feature/HouseDetail';
import RecordHouse from '../page/My/RecordHouse';
import MyPublishHouse from '../page/My/MyPublishHouse';
import PublishHouse from '../page/Feature/publishHouse';
import RoomPage from '../page/Feature/roomPage';
import TenantHouseList from '../page/My/TenantHouseList';
import TenantList from '../page/Feature/TenantList';
import AddTenant from '../page/Feature/addTenant';
import HouseCollectionList from '../page/My/HouseCollectionList'

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
        name={AppRoute.VERDETAILS}
        component={VertifyDetailsPage}
        options={{
          title: '实名详情',
          headerBackTitle: '返回',
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.SUGGESTION}
        component={Suggestion}
        options={{
          title: '意见反馈',
          headerBackTitle: '返回',
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.ABOUT}
        component={About}
        options={{
          title: '关于我们',
          headerBackTitle: '返回',
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.AGREEMENT}
        component={Agreement}
        options={{
          title: '房屋租赁服务协议',
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
      <MyPageNavigator.Screen
        name={AppRoute.TENANTLIST}
        component={TenantList}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.HOUSECOLLECTIONLIST}
        component={HouseCollectionList}
        options={{
          title: '房源收藏',
          headerBackTitle: '返回',
        }}
      />
    </MyPageNavigator.Navigator>
  );
};
