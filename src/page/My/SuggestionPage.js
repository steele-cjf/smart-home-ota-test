import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Spinner, Form, Textarea } from 'native-base'
import ImageUpload from '../Component/imageUpload'
import Theme from '../../style/colors';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUserFeedback } from '../../store/user/index';
import showToast from '../../util/toast';

//问题1. 图片超过4张容易出错
const SuggestionPage = (props) => {

  const setImageForm = (index, obj) => {
    let dataArr = Object.assign([], formImages);
    if (!obj) {
      if (dataArr.length === 6 && dataArr[5] !== '') {
        console.log('&&&&&&&&&&&&&&&')
        dataArr.push('');
      }  
      dataArr.splice(index, 1); 
    } else {
      dataArr[index] = obj;
      if (dataArr.length < 6) {
        dataArr.push('');
      }
    }

    setFormImages(dataArr);
  };

  function submitInfo() {

    if (describeInfo.length === 0) {
      showToast('请输入具体内容')
      return;
    } else if (contactInfo.length === 0) {
      console.log(551, contactInfo)
      showToast('请输入联系方式')
      return;
    } else if (formImages.length < 2) {
      showToast('请至少上传一张图片')
      return;
    }

    const userId = props.userInfo.data.id;

    var result = new FormData();
    result.append('userId', userId);
    result.append('contactInfo', contactInfo);
    result.append('content', describeInfo);

    for (var i in formImages) {
      result.append('images', formImages[i]);
    }

    console.log('formImages***: ', formImages);
    console.log('result***: ', result);

    setLoading(true);

    props.addUserFeedback(result, res => {
      setLoading(false);
      console.log('addUserFeedback****kkkk:', res);
      
      if (!res.code) {
        showToast("提交成功");
        NavigatorService.goBack();
      } else {
        showToast("90909" + res.message);
      }
    });

  }

  
  const [contactInfo, setContactInfo] = useState('');
  const [describeInfo, setDescribeInfo] = useState('');
  const [formImages, setFormImages] = useState(['']);
  const [loading, setLoading] = useState(false);

  const renderImage = () => {
    return (
      formImages.map((item, index) => {
        //console.log(item.uri, '777777')
        return (
          <ImageUpload setImageForm={(obj) => setImageForm(index, obj)} imgUrl={item.uri || ''}/>
        )
      })
    );
  }

  return (
    loading ? <Spinner></Spinner> :
    <View style={styles.containerStyle}>
      <Text style={styles.topTextStyle1}>反馈详情</Text>
      <Text style={styles.topTextStyle1}>反馈描述</Text>
      <Form>
        <Textarea
          style={{ backgroundColor: Theme.cardBackground }}
          rowSpan={5}
          placeholder="请输入具体反馈内容"
          onChangeText={(text) => { setDescribeInfo(text); }}
        //onChange={e => {setData('description', e.nativeEvent.text, 'houseAddition');}}
        //value={}
        />
      </Form>
      <View>
        <Text style={[styles.textTitle, styles.colorDefault]}>联系方式</Text>
        <TextInput style={styles.textContent}
          placeholder='手机/邮箱/QQ'
          placeholderTextColor={Theme.textMuted}
          onChangeText={(text) => { setContactInfo(text); }}
          // onChangeText={(e) => { setContactInfo(e.nativeEvent.text); }} ???
          // value={'ddd'}
        />
      </View>
      <Text style={[styles.topTextStyle1, styles.space]}>{'照片上传'}</Text>
      <Text style={[styles.topTextStyle1, styles.space]}>{'最多6张'}</Text>
      <View style={styles.ImageBox}>
        {
          renderImage()
        }
      </View>
      <TouchableOpacity style={styles.btnStyle} onPress={submitInfo}>
        <Text style={styles.btnTextStyle}>提交</Text>
      </TouchableOpacity>
    </View>
  );

}


const styles = StyleSheet.create({
  headerText: {
    color: '#527BDF',
    fontSize: 16,
    justifyContent: 'center',
    paddingTop: 5,
  },
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Theme.background,
  },
  topViewFail: {
    height: 70,
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#FFECEC',
  },
  topViewWait: {
    backgroundColor: '#ECF2FF',
  },
  topTextStyle1: {
    fontSize: 16,
    color: Theme.textDefault,
  },
  topTextStyle2: {
    fontSize: 14,
    color: Theme.textSecondary,
    marginTop: 10,
  },
  textTitle: {
    paddingVertical: 10,
    fontSize: 14,
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
    backgroundColor: 'yellow',
  },
  space: {
    marginTop: 45,
  },
  ImageBox: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // marginTop: 20,

    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    //justifyContent: "space-between",
    paddingTop: 16,
    //backgroundColor: 'red',
  },
  imageStyle: {
    width: 116,
    height: 87,
    resizeMode: 'cover',
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: 4,
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
  return bindActionCreators({ addUserFeedback }, dispatch);
}

const VSuggestionPage = connect(
  mapStateToProps,
  matchDispatchToProps
)(SuggestionPage);

export default VSuggestionPage;