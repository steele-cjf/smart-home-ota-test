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
import {Spinner} from 'native-base';


export default (props) => {
  // This value is used to determine the initial screen1
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigatorRef = useRef(null)
  // useEffect(() => {
  //   (async () => {
  //     const info = await storage.get('info');
  //     info ? setIsAuthorized(true) : false;
  //     setLoading(false);
  //     NavigatorService.setContainer(navigatorRef.current)
  //   })();
  //   // console.log()
  // }, []);

  // test appState
  const [appState, setAppState] = useState(AppState.currentState);
  const handleAppStateChange = (state) => {
    // setAppState(state);
    console.log('appState******************', appState, state, props);
    return
      setLoading(true);
      (async () => {
        const info = await storage.get('info');
        info ? setIsAuthorized(true) : false;
        if (info) {
          const accessToken = await storage.get('token');
          $DEFAULT_CONFIG.headers.Authorization = 'Bearer ' + accessToken;
        }
        setLoading(false);
        NavigatorService.setContainer(navigatorRef.current)
      })();
  }
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return (() => {
      AppState.removeEventListener('change', handleAppStateChange);
    })
  }, []);
  useEffect(() => {
    NavigatorService.setContainer(navigatorRef.current)
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <Camera />
        <RootSiblingParent>
          <NavigationContainer ref={navigatorRef}>
            {
              loading ? (
                <Spinner color="#5C8BFF" />
              ) : (
                <AppNavigator
                  initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.LOGIN}
                />
              )
            }
          </NavigationContainer>
        </RootSiblingParent>
      </Provider>
    </SafeAreaView>
  );
};
