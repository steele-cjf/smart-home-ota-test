import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { AppRoute } from './AppRoutes';
const Stack = createStackNavigator()

// const AuthRefreshRoute = [AppRoute.HOME, AppRoute.ADDTENANT]
export const AppNavigator = (props) => {
  return (
    <Stack.Navigator {...props} headerMode="none">
      <Stack.Screen name={AppRoute.LOGIN} component={AuthNavigator} />
      <Stack.Screen name={AppRoute.HOME}
        // listeners={({ route, navigation }) => {
        //   setAuthRoute(route)
        //   console.log('*******7changeRoute', navigation)
        // }}
        component={TabNavigator} />
    </Stack.Navigator>
  )
}

// const setAuthRoute = (route) => {
//   setParams(route)
//   if (route.state && route.state.routes) {
//     let { routes } = route.state
//     // if (AuthRefreshRoute.indexOf(item.name) > -1) {
//     setRoutesParams(routes)
//     // }
//   }
// }
// const setRoutesParams = (data) => {
//   data.forEach((item) => {
//     if (item.state) {
//       setRoutesParams(item.state.routes)
//     }
//     setParams(item)
//   })
// }
// const setParams = (data) => {
//   if (!data.params) {
//     data.params = {}
//   }
//   data.params._t = Number(new Date())
// }