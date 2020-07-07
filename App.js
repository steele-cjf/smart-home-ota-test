import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigator/AppNavigator';
import {AppRoute} from './src/navigator/AppRoutes';

export default () => {
  // This value is used to determine the initial screen1
  const isAuthorized = true;

  return (
    <React.Fragment>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator
            initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.REGISTER}
          />
        </NavigationContainer>
      </SafeAreaProvider>
    </React.Fragment>
  );
};
