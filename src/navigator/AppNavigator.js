import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { AppRoute } from './AppRoutes';
import { useEffect } from 'react';
const Stack = createStackNavigator()

export const AppNavigator = (props) => {

  return (
    <Stack.Navigator {...props} headerMode="none">
      <Stack.Screen name={AppRoute.LOGIN} component={AuthNavigator} />
      <Stack.Screen name={AppRoute.HOME} component={TabNavigator}
        listeners={({ route }) => {
          console.log('*****', route)
          // if (route.state && route.state.routes) {
          //   if (!route.state.routes.params) {
          //     route.state.routes[0].params = {}
          //   }
          //   route.state.routes[0].params._t = Number(new Date())
          // }
        }} />
    </Stack.Navigator>
  )
}