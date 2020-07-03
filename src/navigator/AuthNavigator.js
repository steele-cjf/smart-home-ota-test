import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import WelcomeScreen from '../page/WelcomePage';
import {LoginPage} from '../page/LoginPage';
import RegisterPage from '../page/RegisterPage';
import {AppRoute} from './AppRoutes';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name={AppRoute.LOGIN}
        component={LoginPage}
        options={{headerTitle: '登陆'}}
      />
      <Stack.Screen
        name={AppRoute.REGISTER}
        component={RegisterPage}
        options={{headerTitle: '注册'}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
