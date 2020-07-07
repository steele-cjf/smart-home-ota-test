import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigator/AppNavigator';
import {AppRoute} from './src/navigator/AppRoutes';
import { Provider } from 'react-redux';
import store from './src/store'
export default () => {
  // This value is used to determine the initial screen1
  const isAuthorized = false;

  return (
    <React.Fragment>
      <SafeAreaProvider>
        <Provider store={store} >
          <NavigationContainer>
            <AppNavigator
              initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.REGISTER}
            />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </React.Fragment>
  );
};
