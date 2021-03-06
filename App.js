/**
 * @entry router app
 */
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigator/AppNavigator';
import { AppRoute } from './src/navigator/AppRoutes';
import { Provider } from 'react-redux';
import store from './src/store';
import Camera from './src/page/Component/Camera';
import { RootSiblingParent } from 'react-native-root-siblings';


export default (props) => {
  // This value is used to determine the initial screen1
  const navigatorRef = useRef(null)

  useEffect(() => {
    NavigatorService.setContainer(navigatorRef.current)
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <Camera />
        <RootSiblingParent>
          <NavigationContainer ref={navigatorRef}>
            <AppNavigator
              initialRouteName={AppRoute.HOME}
            />
          </NavigationContainer>
        </RootSiblingParent>
      </Provider>
    </SafeAreaView>
  );
};
