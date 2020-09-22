/**
 * @router bottom tab
 */
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import AntDesign from 'react-native-vector-icons/AntDesign';
import Icomoon from '../common/Icomoon';
import { HomeStackComponent } from './HomeNavigator';
import { FeatureStackComponent } from './FeatureNavigator';
import { MyPageStackComponent } from './MyPageNavigator';

import { AppRoute } from './AppRoutes';

const Tab = createBottomTabNavigator();
const BottomTabScreen = (props) => {
  return (
    <Tab.Navigator
      initialRouteName={AppRoute.HOME}
      backBehavior='none'
      tabBarOptions={{
        activeTintColor: '#0d86ff',
        inactiveTintColor: '#C7C7C7'
      }}>
      <Tab.Screen
        name={AppRoute.HOME}
        component={HomeStackComponent}
        options={({ route, navigation }) => {
          const isHomeRoute = route.name === AppRoute.HOME;
          // WORKAROUND: route.state 是一个非常 HACK 的处理方式，皆因其他数据维护太过繁琐
          const routeState = route.state;
          const isHomeRoot = !routeState || routeState?.index === 0;
          // checkoutNavigation(navigation, AppRoute.HOME)

          return {
            title: '首页',
            // 非根 Home 屏都要隐藏 Tabbar
            tabBarVisible: isHomeRoute && isHomeRoot,
            tabBarIcon: ({ focused, color }) => (
              <Icomoon name={'shouye'} color={color} size={24} />
            )
          };
        }}
      />
      <Tab.Screen
        name={AppRoute.FEATURE}
        component={FeatureStackComponent}
        options={({ route }) => {
          const routeState = route.state;
          const isFeatureRoot = !routeState || routeState?.index === 0;
          const isFeatureRoute = route.name === AppRoute.FEATURE;
          return {
            title: '功能',
            tabBarVisible: isFeatureRoot && isFeatureRoute,
            tabBarIcon: ({ focused, color }) => (
              <Icomoon name={'gongneng'} color={color} size={24} />
            )
          };
        }}
      />
      <Tab.Screen
        name={AppRoute.MY}
        component={MyPageStackComponent}
        options={({ route, navigation }) => {
          const routeState = route.state;
          const isMy = !routeState || routeState?.index === 0;
          const isMyRoute = route.name === AppRoute.MY;
          // checkoutNavigation(navigation, AppRoute.MY)
          return {
            title: '我的',
            tabBarVisible: isMy && isMyRoute,
            tabBarOptions: {
            },
            tabBarIcon: ({ focused, color }) => (
              <Icomoon name={'wode'} color={color} size={24} />
            )
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
