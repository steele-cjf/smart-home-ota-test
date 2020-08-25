import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
//import Theme from '../../style/colors';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfoById} from '../../../store/user/index';

const UserPassedPage = (props) => {

  useEffect(() => {
    getPassedUserInfo(); 
  }, []);

  function getPassedUserInfo() {
    const userId = props.userInfo.data.id;
   
    console.log('****userId******:', userId);
    props.getUserInfoById(userId, res => {
      console.log('****getUserInfoById******:', res);

      if (!res.code) {
        //dealDataRefresh(res.data);
      } else {
        showToast("90909"+res.message);
      }
    });
  }
  return(
    <Text>jkjkldfsjkldsfjklfdsjkfdsjkdfsds</Text>
  );

}


// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    dictionaryMappings: state.dictionaryMappings
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getUserInfoById}, dispatch);   
}

const VUserPassedPage = connect(
  mapStateToProps,
  matchDispatchToProps
)(UserPassedPage);

export default VUserPassedPage;
