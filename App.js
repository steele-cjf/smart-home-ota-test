import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { SafeAreaView, Text } from 'react-native';
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
  }, []);

  useEffect(() => {
    console.log(999)
  }, [props.AppRoute])

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
