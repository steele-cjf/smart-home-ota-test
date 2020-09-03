import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '../page/My/MyPage';
import PersonalInfo from '../page/My/PersonalInfo';
import AuthenticationPage from '../page/Home/AuthenticationPage';
import IdCardVertify from '../page/Home/IdCardVertify';
import PassportVertify from '../page/Home/PassportVertify';
import MyQRCode from '../page/My/MyQRCode';
import VertifyDetailsPage from '../page/Home/VertifyDetails';
import UserPassedPage from '../page/Home/VertifyDetails/UserPassedPage';
import Suggestion from '../page/My/SuggestionPage';
import About from '../page/My/AboutPage';
import Agreement from '../page/Login/Agreement';
import MyHouseList from '../page/My/MyHouseList';
import HouseDetail from '../page/Feature/HouseDetail';
import RecordHouse from '../page/My/RecordHouse';
import MyPublishHouse from '../page/My/MyPublishHouse';
import PublishHouse from '../page/Feature/publishHouse';
import RoomPage from '../page/Feature/roomPage';
import TenantHouseList from '../page/My/TenantHouseList';
import TenantList from '../page/Feature/TenantList';
import AddTenant from '../page/Feature/addTenant';
import HouseCollectionList from '../page/My/HouseCollectionList'
import PublishHouseDetail from '../page/Home/PublishHouseDetail';
import { Text } from 'react-native'
import { AppRoute } from './AppRoutes';

const MyPageNavigator = createStackNavigator();

export const MyPageStackComponent = () => {
  return (
    <MyPageNavigator.Navigator
      screenOptions={{
        cardStyle: {
          fontSize: 16,
          backgroundColor: '#fff',
        },
      }}>
      <MyPageNavigator.Screen
        name={AppRoute.MY}
        component={MyPage}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.PERSONALINFO}
        component={PersonalInfo}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.AUTHENTICATION}
        component={AuthenticationPage}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.IDCARDVERTIFY}
        component={IdCardVertify}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.PASSPORTVERTIFY}
        component={PassportVertify}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.MYQRCODE}
        component={MyQRCode}
        options={{
          headerTitle: props => <Text>aaaaa</Text>
          // headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.VERDETAILS}
        component={VertifyDetailsPage}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.USERPASSED}
        component={UserPassedPage}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.SUGGESTION}
        component={Suggestion}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.ABOUT}
        component={About}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.AGREEMENT}
        component={Agreement}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.MYHOUSELIST}
        component={MyHouseList}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.HOUSEDETAIL}
        component={HouseDetail}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.RECORD}
        component={RecordHouse}
        options={{
          headerShown: false
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.PUBLISHLISE}
        component={MyPublishHouse}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.PUBLISH}
        component={PublishHouse}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.ROOM}
        component={RoomPage}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.TENANTHOUSELIST}
        component={TenantHouseList}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.ADDTENANT}
        component={AddTenant}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.TENANTLIST}
        component={TenantList}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.HOUSECOLLECTIONLIST}
        component={HouseCollectionList}
        options={{
          headerShown: false,
        }}
      />
      <MyPageNavigator.Screen
        name={AppRoute.PUBLISHOUSEDETAIL}
        component={PublishHouseDetail}
        options={{
          headerShown: false,
        }}
      />
    </MyPageNavigator.Navigator>
  );
};
