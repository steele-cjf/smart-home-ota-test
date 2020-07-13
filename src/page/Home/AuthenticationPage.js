import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, NativeModules} from 'react-native';
import {Button, Icon, Card, ListItem} from 'react-native-elements';
import * as HomeAction from '../../store/home/index';

export const AuthenticationPage = props => {
  const [AuthList] = useState([
    {name: '实人认证', id: 1},
    {name: '身份证认证', id: 2},
    {name: '护照认证', id: 3},
  ]);

  return (
    <View style={{marginTop: 150}}>
      <Card containerStyle={{padding: 0}}>
        {AuthList.map((u, i) => {
          return <ListItem key={i} title={u.name} />;
        })}
      </Card>
    </View>
  );
};

// reducer获取
// function mapStateToProps(state) {
//   return {
//     userInfo: state.userInfo,
//   };
// }
// function matchDispatchToProps(dispatch) {
//   return bindActionCreators(HomeAction, dispatch);
// }
// export default connect(
//   mapStateToProps,
//   matchDispatchToProps,
// )(HomePage);
