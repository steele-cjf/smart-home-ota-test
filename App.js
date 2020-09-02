import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigator/AppNavigator';
import { AppRoute } from './src/navigator/AppRoutes';
import { Provider } from 'react-redux';
import store from './src/store';
import storage from './src/util/storage';
import Camera from './src/page/Component/Camera';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Spinner } from 'native-base';


export default (props) => {
  // This value is used to determine the initial screen1
  const [loading, setLoading] = useState(false);
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
            {/* {
              loading ? (
                <Spinner color="#5C8BFF" />
              ) : ( */}
            <AppNavigator
              initialRouteName={AppRoute.LOGIN}
            />
            {/* )
            } */}
          </NavigationContainer>
        </RootSiblingParent>
      </Provider>
    </SafeAreaView>
  );
};
