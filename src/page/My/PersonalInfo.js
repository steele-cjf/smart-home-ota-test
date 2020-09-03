import React, {useState, useEffect, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { Spinner } from 'native-base'
import ImagePicker from 'react-native-image-picker';
import Picker from 'react-native-picker';
import Theme from '../../style/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';  
import HeaderCommon from '../Component/HeaderCommon'

import storage from '../../util/storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfo} from '../../store/home/index';
import {modifyPersonalInfo} from '../../store/user/index';

const PersonalInfoPage = (props) => {     
  
  function imagePickerAction() {
    //test
    let data = [];
    for(var i=0;i<100;i++){
        data.push(i);
    }
    
    Picker.init({
        pickerData: data,
        selectedValue: [59],
        onPickerConfirm: data => {
            console.log(data);
        },
        onPickerCancel: data => {
            console.log(data);
        },
        onPickerSelect: data => {
            console.log(data);
        }
    });
    Picker.show();
    //return;

    // var options = {
    //   title:'请选择',
    //   cancelButtonTitle:'取消',
    //   takePhotoButtonTitle:'拍照',
    //   chooseFromLibraryButtonTitle:'选择相册',
    //   // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    //   quality:0.75,
    //   allowsEditing:true,
    //   noData:false,
    //   storageOptions: {
    //       skipBackup: true,
    //       path:'images'
    //   }
    // };

    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     setHeadImage({uri: response.uri});

    //     let imageObj = {
    //       uri: Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri,
    //       name: response.fileName || 'upload.jpg',
    //       type: response.type,
    //     };
    //     setImageObj(imageObj);
    //   }
    // });
  }

  useFocusEffect(
    useCallback(() => {
      handleInfo(); 
    }, [props.route])
  )
  // useEffect(() => {
  //   handleInfo(); 
  // }, []);

  function handleInfo() {
    props.getUserInfo(res => {
      console.log('getPersonalInfo_userInfo1:', res);
      setLoading(false);
      if (!res.code) {
        dealDataRefresh(res.data);
      } else {
        showToast("90909"+res.message);
      }
    });
    
    //读取用户信息
    // var userInfo = props.userInfo;
    // console.log('getPersonalInfo_userInfo2:', userInfo);
    // if (userInfo.data) {
    //   dealDataRefresh(userInfo.data);
    // }
  }

  function dealDataRefresh(data) { 
    var sex = props.dictionaryMappings.gender[data.gender];
    var strNum = data.identificationNo;
    if (strNum && strNum.length > 5) {
      strNum = strNum.substr(0, 3) + "*************" + strNum.substr(strNum.length-2, 2)
    }

    const actualBasicData = [
      {title: "真实姓名", content: data.name},
      {title: "性别", content: sex},
      {title: "出生日期", content: data.birthDate},
      {title: "证件号", content: strNum},
      {title: "手机号码", content: data.mobile},
    ];

    const actualOtherData = {
      "教育程度": data.educationLevel,
      "所在区域": data.regionId,
      "详细地址": data.address, 
    };

    setBasicData(actualBasicData);
    setOtherData(actualOtherData);

    if (data.avatarImageUrl) {
      setHeadImage({uri: data.avatarImageUrl}); 
    }
  }

  //请求保存数据
  function saveOtherDataInfo() {
    var result = new FormData();

    if (otherData['教育程度']) {
      result.append('educationLevel', otherData['教育程度']);
    }
    if (otherData['所在区域']) {
      result.append('regionId', otherData['所在区域']);
    }
    if (otherData['详细地址']) {
      result.append('address', otherData['详细地址']);
    }
    if (imageObj) {
      result.append('avatarImage', imageObj);
    }

    if (!otherData['教育程度'] && !otherData['所在区域'] 
    && !otherData['详细地址'] && !imageObj) {
      //showToast("未提交任何信息");
      return;
    }

    console.log('传入avatarImage: **:  ', imageObj);
    console.log('传入result: **:  ', result);

    const userId = props.userInfo.data.id;
    props.modifyPersonalInfo(userId, result, res => {
      console.log('modifyPersonalInfo****kkkk:', res);

      if (!res.code) {
        async function aa(res){
          console.log('^^^^^^async_res:', res);
          await storage.set('info', res);  //保存新的个人信息
          showToast("修改成功");
          NavigatorService.goBack();
        }
        aa(res);
        // showToast("修改成功");
        // NavigatorService.goBack();
      } else {
        showToast("90909"+res.message);
      }
    });

  }
  
  const setSaveData = (key, value) => {
    let data = Object.assign({}, otherData);
    data[key] = value;
    setOtherData(data);
  };

  const img = require('../../assets/images/head.png');

  const [basicData, setBasicData] = useState([]);
  const [otherData, setOtherData] = useState({});
  const [headImage, setHeadImage] = useState(img);
  const [imageObj, setImageObj] = useState(null);
  const [loading, setLoading] = useState(true);

  const renderBasicView = () => {
    let arr = [];
    for (let index = 0; index < basicData.length; index++) {
      const item = basicData[index];
      let a = (
        <View>
          <Text style={[styles.textTitle, styles.colorSecondary]}>{item.title}</Text>
          <Text style={[styles.textContent, styles.colorSecondary]}>{item.content}</Text>
        </View>
      );
      arr.push(a);
    }

    return arr;
  }

  return (
    <View style={styles.containerStyle0}>
      <HeaderCommon
        options={{
        backTitle: '返回',
        title: '个人信息'
        }}
      />
      {loading ? <Spinner></Spinner> :
      <View style={styles.containerStyle}>
        <TouchableOpacity style={styles.headContainer} onPress={imagePickerAction}>
          <Text style={styles.textTitle}>头像</Text>
          <Image style={styles.headImageStyle} source={headImage} />
          <AntDesign name="right" style={styles.rightArrow} />
        </TouchableOpacity>
        <View style={[styles.sigContainer, {paddingBottom: 10}]}>
          <Text style={[styles.textTitle, styles.fontSize16]}>基本资料</Text>
          {
            renderBasicView()
          }
        </View>
        { 
          Object.keys(otherData).map((item, index) => { 
            return (
              <View style={styles.sigContainer}>
                <Text style={[styles.textTitle, styles.colorDefault]}>{item}</Text>
                <TextInput style={[styles.textContent,]} //styles.rightInput
                  onChangeText={(text) => {setSaveData(item, text);}}
                  value={otherData[item]}
              />
              </View>
            ); 
          })
        }
        <TouchableOpacity style={styles.btnStyle} onPress={saveOtherDataInfo}> 
          <Text style={styles.btnTextStyle}>保存</Text>
        </TouchableOpacity>
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
  headContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  headImageStyle: {
    position: 'absolute',
    right: 28,
    height: 48, 
    width: 48,
    borderRadius: 24,
  },
  sigContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  textTitle: {
    paddingVertical: 18,
    fontSize: 14,
    color: Theme.textDefault,
  },
  fontSize16: {
    fontSize: 16,
  },
  colorSecondary: {
    color: Theme.textSecondary,
    paddingVertical: 10,
  },
  textContent: {
    position: 'absolute',
    left: 80,
    right: 0,
    paddingVertical: 18,
    textAlign: 'right',
    fontSize: 14,
    color: Theme.textDefault,
  },
  rightInput: {
    fontSize: 14,
    paddingRight: 24,
  },
  rightArrow: {
    position: 'absolute', 
    right: -3, 
    top: 17,
    fontSize: 14, 
    color: Theme.textSecondary, 
    textAlign: 'right',
  },
  btnStyle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5C8BFF'
  },
  btnTextStyle: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 16, 
    color: '#FFFFFF', 
  },
});


// reducer获取
function mapStateToProps(state2) {
  return {
    userInfo: state2.userInfo,
    dictionaryMappings: state2.dictionaryMappings
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getUserInfo, modifyPersonalInfo}, dispatch);   
}

const VPersonalInfoPage = connect(
  mapStateToProps,
  matchDispatchToProps
)(PersonalInfoPage);

export default VPersonalInfoPage;
