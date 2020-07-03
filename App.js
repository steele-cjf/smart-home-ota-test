import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigator/AppNavigator';
import {AppRoute} from './src/navigator/AppRoutes';

export default () => {
  // This value is used to determine the initial screen
  const isAuthorized = false;

  return (
    <React.Fragment>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator
            initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.LOGIN}
          />
        </NavigationContainer>
      </SafeAreaProvider>
    </React.Fragment>
  );
};
