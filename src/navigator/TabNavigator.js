import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {HomePage} from '../page/HomePage';
import DynamicPage from '../page/DynamicPage';
import MyPage from '../page/MyPage';
import {AppRoute} from './AppRoutes';
// import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();
const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={AppRoute.HOME}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'black',
      }}>
      <Tab.Screen
        name={AppRoute.HOME}
        component={HomePage}
        options={{
          title: '首页',
          tabBarIcon: ({focused, color}) => (
            <Ionicons name={'ios-home'} color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={AppRoute.MY}
        component={MyPage}
        options={{
          title: '动态',
          tabBarIcon: ({focused, color}) => (
            <Ionicons name={'ios-bonfire'} color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={AppRoute.DYNAMIC}
        component={DynamicPage}
        options={{
          title: '我的',
          tabBarIcon: ({focused, color}) => (
            <FontAwesome name={'user'} color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
