import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from '../../style/colors';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfoUrl} from '../../store/user/index';


const MyQRCodePage = (props) => {

  useEffect(() => {
    getUserInfoUrl(); 
  }, []);

  function getUserInfoUrl() {
    var userId = props.userInfo.data.id;
    
    props.getUserInfoUrl(userId, url => {
      console.log('******getUserInfoUrl:', url);
      if (url) {
        setImageUrl1(url);
      } else {
        showToast("90909");
      }
    });
  }


  const [imageUrl1, setImageUrl1] = useState('https://facebook.github.io/react-native/docs/assets/favicon.png'); 
  
  return(
    <View style={styles.containerStyle}>
      <Text>sdffsadsadafsdsaffadsfsdfadsfsdafdsa</Text>
      <Image style={styles.imageStyle} source={{uri: imageUrl1}} />
    </View>
  );
  
}


const styles = StyleSheet.create({  
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Theme.background,
  },
  imageStyle: {
    // position: 'absolute',
    // right: 28,
    height: 148, 
    width: 148,
    //borderRadius: 24,
    backgroundColor: 'gray',
  },
});

// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getUserInfoUrl}, dispatch);   
}

const VMyQRCodePage = connect(
  mapStateToProps,
  matchDispatchToProps
)(MyQRCodePage);

export default VMyQRCodePage;