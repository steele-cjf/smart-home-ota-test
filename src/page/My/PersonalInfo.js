import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { Spinner } from 'native-base'
import ImagePicker from 'react-native-image-picker';
import Theme from '../../style/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';  

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfo} from '../../store/home/index';
import {modifyPersonalInfo} from '../../store/user/index';

const PersonalInfoPage = (props) => {     
  
  function imagePickerAction() {
    var options = {
      title:'请选择',
      cancelButtonTitle:'取消',
      takePhotoButtonTitle:'拍照',
      chooseFromLibraryButtonTitle:'选择相册',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      quality:0.75,
      allowsEditing:true,
      noData:false,
      storageOptions: {
          skipBackup: true,
          path:'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('ImagePicker_Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('source*******kkk: ', source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //setImageForm();
        setAvatarSource(source);
      }
    });
  }

  useEffect(() => {
    handleInfo(); 
  }, []);

  function handleInfo() {
    props.getUserInfo(res => {
      console.log('getPersonalInfo_userInfo:', res);
      console.log(6666, res.message);
      setLoading(false);

      if (!res.code) {
        dealDataRefresh(res.data);
      } else {
        showToast("90909"+res.message);
      }
    });
  }

  function dealDataRefresh(data) { 
    const actualBasicData = [
      {title: "真实姓名", content: data.name},
      {title: "性别", content: data.gender},
      {title: "出生日期", content: data.birthDate},
      {title: "证件号", content: data.identificationNo},
      {title: "手机号码", content: data.mobile},
    ];

    const actualOtherData = [
      {title: "教育程度", content: data.educationLevel},
      {title: "所在区域", content: data.regionId},
      {title: "详细地址", content: data.address}, //identificationAddress
    ];

    setBasicData(actualBasicData);
    setOtherData(actualOtherData);
  }

  //请求保存数据
  function saveOtherDataInfo() {

    var result = new FormData();
    result.append('address', 'Test地址随便1');

    const result2 = {
      address: 'Test地址随便1',
    };

    //changeToForm(result); //???
    //result.append('userId', props.userInfo.data.id);
    //result.append('userImage', avatarSource); //headImage

    // result.append('address', 'Test地址随便1');
    console.log('result: ******:  ', result);

    const userId = props.userInfo.data.id;
    props.modifyPersonalInfo(userId, result, res => {
      console.log('modifyPersonalInfo****kkkk:', res);

      if (!res.code) {
        showToast("修改成功");
        dealDataRefresh(res.data);
      } else {
        showToast("90909"+res.message);
      }
    });

  }
  
  const [basicData, setBasicData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [avatarSource, setAvatarSource] = useState(null);
  //const [headImage, setHeadImage] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    loading ? <Spinner></Spinner> :
    <View style={styles.containerStyle}>
      <TouchableOpacity style={styles.headContainer} onPress={imagePickerAction}>
        <Text style={styles.textTitle}>头像</Text>
        <Image style={styles.headImageStyle} source={avatarSource} />
        <AntDesign name="right" style={styles.rightArrow} />
      </TouchableOpacity>
      <View style={styles.sigContainer}>
        <Text style={[styles.textTitle, styles.fontSize16]}>基本资料</Text>
        {
          basicData.map((item, index) => { 
            return (
              <View>
                <Text style={[styles.textTitle, styles.colorSecondary]}>{item.title}</Text>
                <Text style={[styles.textContent, styles.colorSecondary]}>{item.content}</Text>
              </View>
            ); 
          })
        }
      </View>
      {
        otherData.map((item, index) => { 
          return (
            <View style={styles.sigContainer}>
              <Text style={[styles.textTitle, styles.colorDefault]}>{item.title}</Text>
              <TextInput style={[styles.textContent, styles.rightInput]}>{item.content}</TextInput>
              {/* {(index === 0 || index === 1) && <AntDesign name="right" style={styles.rightArrow} /> } */}
            </View>
          ); 
        })
      }

      <TouchableOpacity style={styles.btnStyle} onPress={saveOtherDataInfo}> 
        <Text style={styles.btnTextStyle}>保存</Text>
      </TouchableOpacity>
    </View>
  ); 
}


const styles = StyleSheet.create({  
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Theme.background,
  },
  headContainer: {
    //marginBottom: 10,
    marginVertical: 10,
    //backgroundColor: '#FFECEC',
  },
  headImageStyle: {
    position: 'absolute',
    right: 28,
    height: 48, 
    width: 48,
    borderRadius: 24,
    backgroundColor: 'yellow',
  },
  sigContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
    //backgroundColor: 'yellow',
  },
  textTitle: {
    paddingVertical: 16,
    fontSize: 14,
    color: Theme.textDefault,
    //backgroundColor: 'red',
  },
  fontSize16: {
    fontSize: 16,
  },
  colorSecondary: {
    color: Theme.textSecondary,
  },
  textContent: {
    position: 'absolute',
    left: 80,
    right: 0,
    paddingVertical: 10,
    textAlign: 'right',
    fontSize: 14,
    color: Theme.textDefault,
  },
  rightInput: {
    fontSize: 14,
    paddingRight: 24,
    //backgroundColor: 'red',
  },
  rightArrow: {
    position: 'absolute', 
    right: 0, 
    top: 10,
    fontSize: 14, 
    color: Theme.textSecondary, 
    //backgroundColor: 'red'
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
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
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
