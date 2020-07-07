import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import LoginPage from '../page/LoginPage';
import LoginPage from '../page/Login';

import {AppRoute} from './AppRoutes';

const Stack = createStackNavigator();

class AuthNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerTitle: '登陆'}}
        />
      </Stack.Navigator>
    );
  }
}

export default AuthNavigator;
