import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from '../page/HomePage';
import DynamicPage from '../page/DynamicPage';
import MyPage from '../page/MyPage';
import {AppRoute} from './AppRoutes';

const Tab = createBottomTabNavigator();
const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={AppRoute.HOME}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomePage') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'MyPage') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name={AppRoute.HOME} component={HomePage} />
      <Tab.Screen name={AppRoute.MY} component={MyPage} />
      <Tab.Screen name={AppRoute.DYNAMIC} component={DynamicPage} />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
