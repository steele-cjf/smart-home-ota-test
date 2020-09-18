import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Spinner } from 'native-base'
import Theme from '../../../style/colors';
import HeaderCommon from '../../Component/HeaderCommon'
import {AppRoute} from '../../../navigator/AppRoutes'; 

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfoById, deleteTenant} from '../../../store/user/index';

const UserPassedPage = (props) => {

  useEffect(() => {
    getPassedUserInfo(); 
  }, []);

  function getPassedUserInfo() {
    let userMeId = props.userInfo.data.id; 
    const {params} = props.route;

    if (params.userId === userMeId) {
      //setCanDelete(false);    //家庭成员的本人(排在列表的第一个成员)不能删除，其他可删除(改为：添加的本人也能被删除)
    } else {
      setCanDelete(true);
    }

    props.getUserInfoById(params.userId, res => {
      console.log('****getUserInfoById******:', res);
      setLoading(false);

      if (!res.code) {
        dealDataRefresh(res.data);
      } else {
        showToast(res.message);
      }
    });

  }

  function dealDataRefresh(data) { 
    let actualHeadData = {
      headImage: {uri: data.avatarImageUrl}, 
      name: data.name,
      mobile: data.mobile, 
    };

    if (!data.avatarImageUrl) { 
      const img = require('../../../assets/images/head.png');
      actualHeadData.headImage = img; 
    }
    setHeadData(actualHeadData);

    var sex = props.dictionaryMappings.gender[data.gender];
    var strNum = data.identificationNo;
    if (strNum && strNum.length > 5) {
      strNum = strNum.substr(0, 3) + "*************" + strNum.substr(strNum.length-2, 2)
    }
    const actualBasicData = [
      {title: "性别", content: sex},
      {title: "民族", content: data.nation},
      {title: "出生日期", content: data.birthDate},
      {title: "证件号", content: strNum},
      {title: "所在区域", content: data.regionId},
      {title: "详细地址", content: data.address},
      {title: "教育程度", content: data.educationLevel},
    ];
    setBasicData(actualBasicData);
  }

  function alertDelete() {
    let options = [
      { text: '取消', onPress: () => console.log('Ask me later pressed')},
      { text: '确定', onPress: () => deleteTenant() },
      {
        // cancelable and onDismiss only work on Android.
        cancelable: true,
        onDismiss: () =>
          console.log(
            'This alert was dismissed by tapping outside of the alert dialog.'
          )
      }
    ]
    if (Platform.OS === 'android') {
      options.splice(1, 0, {})
    }
    Alert.alert('确定删除', '', options);
  }

  function deleteTenant() {
    const {params} = props.route;
    console.log("@@@@@@@@", params);
   
    const data = {
      userId: params.userId,
      houseId: params.houseId,
      tenantUserId: params.tenantUserId,
    };

    props.deleteTenant(data, res => {
      console.log('deleteTenant****kkkk:', res);

      if (!res.code) {
        showToast("删除成功");
        if (params.familyMember) {
          NavigatorService.goBack();
        } else {
          NavigatorService.navigate(AppRoute.HOUSEDETAIL);
        }
      } else {
        showToast(res.message);
      }
    });
  }


  const [headData, setHeadData] = useState({});
  const [basicData, setBasicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canDelete, setCanDelete] = useState(true); 

  return (
    <View style={styles.containerStyle0}>
      <HeaderCommon
        options={{
        backTitle: '返回',
        title: '成员详情'
        }}
      />
      {loading ? <Spinner style={STYLES.spinner} color="#5C8BFF"/> :
      <View style={styles.containerStyle}>
        <Image style={styles.headImageStyle} source={headData.headImage} />
        <Text style={styles.textName}>{headData.name}</Text>
        <Text style={styles.textMobile}>{headData.mobile}</Text>
        { 
          basicData.map((item, index) => { 
            return (
              <View style={styles.sigContainer}>
                <Text style={styles.textTitle}>{item.title}</Text>
                <Text style={styles.textContent}>{item.content}</Text>
              </View>
            ); 
          })
        }
        {!canDelete ?  null :
          <TouchableOpacity style={styles.btnStyle} onPress={alertDelete}> 
            <Text style={styles.btnTextStyle}>删除</Text>
          </TouchableOpacity>
        }
      </View>
      }
    </View>
  ); 

}


const styles = StyleSheet.create({  
  containerStyle0: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Theme.background,
  },
  headImageStyle: {
    marginTop: 29,
    marginBottom: 17,
    height: 48, 
    width: 48,
    borderRadius: 24,
  },
  textName: {
    position: 'absolute',
    left: 88,
    top: 31, 
    fontSize: $screen.scaleSize(14),
    color: Theme.textDefault,
  },
  textMobile: {
    position: 'absolute',
    left: 88,
    top: 59, 
    fontSize: $screen.scaleSize(14),
    color: Theme.textDefault,
  },
  sigContainer: {
    paddingVertical: 10,
  },
  textTitle: {
    fontSize: $screen.scaleSize(14),
    color: Theme.textSecondary,
  },
  textContent: {
    position: 'absolute',
    left: 80,
    right: 0,
    top: 10,
    textAlign: 'right',
    fontSize: $screen.scaleSize(14),
    color: Theme.textDefault,
  },
  btnStyle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E7263E'
  },
  btnTextStyle: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: $screen.scaleSize(16), 
    color: '#FFFFFF', 
  },
});


// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    dictionaryMappings: state.dictionaryMappings
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getUserInfoById, deleteTenant}, dispatch);   
}

const VUserPassedPage = connect(
  mapStateToProps,
  matchDispatchToProps
)(UserPassedPage);

export default VUserPassedPage;
