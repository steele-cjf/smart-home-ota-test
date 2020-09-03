import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeaturePage from '../page/Feature/index';
import HouseDetail from '../page/Feature/HouseDetail';
import PublishHouse from '../page/Feature/publishHouse';
import AddTenant from '../page/Feature/addTenant';
import RoomPage from '../page/Feature/roomPage';
import TenantList from '../page/Feature/TenantList';
import AuthenticationPage from '../page/Home/AuthenticationPage';
import ComponentTest from '../page/ComponentTest/index';
import { AppRoute } from './AppRoutes';
import MyPublishHouse from '../page/My/MyPublishHouse';
import RecordHouse from '../page/My/RecordHouse';
import VertifyDetailsPage from '../page/Home/VertifyDetails';
import PersonalInfo from '../page/My/PersonalInfo';
import UserPassedPage from '../page/Home/VertifyDetails/UserPassedPage';

const FeatureStack = createStackNavigator();

export const FeatureStackComponent = () => {
  return (
    <FeatureStack.Navigator
      screenOptions={{
        animationEnabled: Platform.OS === 'android' ?  false : true,
        cardStyle: {
          fontSize: $screen.scaleSize(16),
          backgroundColor: '#fff',
        },
      }}>
      <FeatureStack.Screen
        name={AppRoute.FEATURE}
        component={FeaturePage}
        options={{
          headerShown: false,
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.RECORD}
        component={RecordHouse}
        options={{
          headerShown: false
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.HOUSEDETAIL}
        component={HouseDetail}
        options={{
          headerShown: false,
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.PUBLISH}
        component={PublishHouse}
        options={{
          headerShown: false,
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.ADDTENANT}
        component={AddTenant}
        options={{
          headerShown: false,
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.ROOM}
        component={RoomPage}
        options={{
          headerShown: false,
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.TENANTLIST}
        component={TenantList}
        options={{
          headerShown: false,
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.COMPONENTTEST}
        component={ComponentTest}
        options={{
          title: 'ComponentTest',
          headerBackTitle: '返回',
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.AUTHENTICATION}
        component={AuthenticationPage}
        options={{
          headerShown: false,
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.PUBLISHLISE}
        component={MyPublishHouse}
        options={{
          headerShown: false,
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.VERDETAILS}
        component={VertifyDetailsPage}
        options={{
          headerShown: false,
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.PERSONALINFO}
        component={PersonalInfo}
        options={{
          headerShown: false,
        }}
      />
      <FeatureStack.Screen
        name={AppRoute.USERPASSED}
        component={UserPassedPage}
        options={{
          headerShown: false,
        }}
      />
    </FeatureStack.Navigator>
  );
};
