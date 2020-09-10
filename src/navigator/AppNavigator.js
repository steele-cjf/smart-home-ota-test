/**
 * @router all
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { AppRoute } from './AppRoutes';
import Agreement from '../page/Login/Agreement';

const Stack = createStackNavigator()

// const AuthRefreshRoute = [AppRoute.HOME, AppRoute.ADDTENANT]
export const AppNavigator = (props) => {
  return (
    <Stack.Navigator {...props} headerMode="none" screenOptions={({ route, navigation }) => ({
      gestureEnabled: false
    })}>
      <Stack.Screen
        name={AppRoute.LOGIN} options={{
          gestureEnabled: false
        }} component={AuthNavigator} />
      <Stack.Screen name={AppRoute.HOME}
        component={TabNavigator} />
      <Stack.Screen name={AppRoute.AGREEMENT} component={Agreement} />
    </Stack.Navigator>
  )
}