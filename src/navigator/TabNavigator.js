import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {HomeStackComponent} from './HomeNavigator';
import DynamicPage from '../page/DynamicPage';
import MyPage from '../page/MyPage';
import {AppRoute} from './AppRoutes';

const Tab = createBottomTabNavigator();
const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={AppRoute.HOME}
      tabBarOptions={{
        activeTintColor: '#0d86ff',
        inactiveTintColor: '#555',
      }}>
      <Tab.Screen
        name={AppRoute.HOME}
        component={HomeStackComponent}
        options={{
          title: '首页',
          tabBarIcon: ({focused, color}) => (
            <Ionicons name={'ios-home'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={AppRoute.MY}
        component={MyPage}
        options={{
          title: '动态',
          tabBarIcon: ({focused, color}) => (
            <Ionicons name={'ios-bonfire'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={AppRoute.DYNAMIC}
        component={DynamicPage}
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
