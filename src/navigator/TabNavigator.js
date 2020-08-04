import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {HomeStackComponent} from './HomeNavigator';
import {FeatureStackComponent} from './FeatureNavigator';

// import DynamicPage from '../page/DynamicPage';
import MyPage from '../page/MyPage';
import {AppRoute} from './AppRoutes';

const Tab = createBottomTabNavigator();
const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={AppRoute.HOME}
      tabBarOptions={{
        activeTintColor: '#0d86ff',
        inactiveTintColor: '#555'
      }}>
      <Tab.Screen
        name={AppRoute.HOME}
        component={HomeStackComponent}
        options={({route}) => {
          const isHomeRoute = route.name === AppRoute.HOME;
          // WORKAROUND: route.state 是一个非常 HACK 的处理方式，皆因其他数据维护太过繁琐
          const routeState = route.state;
          const isHomeRoot = !routeState || routeState?.index === 0;
          return {
            title: '首页',
            // 非根 Home 屏都要隐藏 Tabbar
            tabBarVisible: isHomeRoute && isHomeRoot,
            tabBarIcon: ({focused, color}) => (
              <Ionicons name={'ios-home'} color={color} size={24} />
            ),
          };
        }}
      />
      <Tab.Screen
        name={AppRoute.FEATURE}
        component={FeatureStackComponent}
        options={({route}) => {
          const routeState = route.state;
          const isFeatureRoot = !routeState || routeState?.index === 0;
          const isFeatureRoute = route.name === AppRoute.FEATURE;
          return {
            title: '功能',
            tabBarVisible: isFeatureRoot && isFeatureRoute,
            tabBarIcon: ({focused, color}) => (
              <Ionicons name={'ios-bonfire'} color={color} size={24} />
            ),
          };
        }}
      />
      <Tab.Screen
        name={AppRoute.MY}
        component={MyPage}
        options={{
          title: '我的',
          tabBarIcon: ({focused, color}) => (
            <FontAwesome name={'user'} color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
