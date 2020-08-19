import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { SafeAreaView, Text, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigator/AppNavigator';
import { AppRoute } from './src/navigator/AppRoutes';
import { Provider } from 'react-redux';
import store from './src/store';
import storage from './src/util/storage';
import Camera from './src/page/Component/Camera';
export default (props) => {
  // This value is used to determine the initial screen1
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigatorRef = useRef(null)
  useEffect(() => {
    (async () => {
      const info = await storage.get('info');
      info ? setIsAuthorized(true) : false;
      setLoading(false);
      NavigatorService.setContainer(navigatorRef.current)
    })();
    console.log()
  }, []);

  useEffect(() => {
    console.log(999)
  }, [props.AppRoute])

  // test appState
  const [appState, setAppState] = useState(AppState.currentState);
  const handleAppStateChange = (state) => {
    setAppState(state);
  }
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return (() => {
      AppState.removeEventListener('change', handleAppStateChange);
    })
  }, []);
  useEffect(() => {
    console.log(appState);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <Camera />
        <NavigationContainer ref={navigatorRef}>
          {/* {loading ? (
            <Text>Loading.....</Text>
          ) : ( */}
          <AppNavigator
            initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.LOGIN}
          />
          {/* )} */}
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};
